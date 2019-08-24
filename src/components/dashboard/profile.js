import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../menu-dashboard-left';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Redirect} from 'react-router-dom';
import {url, email} from 'redux-form-validators';
import {  createTextMask } from 'redux-form-input-masks';


import { fetchCities } from '../../actions/city';
import { fetchBairros } from '../../actions/bairro';
import { SUCCESS_EDIT_USER } from '../../actions/types';

import Multiselect from 'react-widgets/lib/Multiselect'

import 'react-widgets/dist/css/react-widgets.css'

import {fetchMe, editUser} from '../../actions/user';

const dateMask = createTextMask({
	pattern: '99/99/9999',
	suffix: '',
});


const myFile = value => {
	if(value){
		if(value.length == 0)
			return undefined;
		
		if(!value[0].type.includes('image'))
			return "O arquivo deve ser do tipo imagem";
			
		if(value[0].size < 1000){
			return "Tamanho do arquivo não pode ser menor que 1 KB";
		}

		if(value[0].size > 15 * 1024 * 1024){
			return "Tamanho do arquivo não pode ser maior que 10 MB";
		}

		console.log("ver o tipo: ", value[0].type.includes('image'));


		//if(value.FileList)
	}
	
	return undefined
}

const required = value => value ? undefined : 'Campo Obrigatório'

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;


const maxLength15 = maxLength(15)

const minLength = min => value =>
    value && value.length < min ? `O campo deve conter no mínimo ${min} caracteres` : undefined;


class Profile extends Component{

    constructor(){
        super();

		this.state = {
			userLogged: null,
			labelMultiselect: {categorias: true, tags: true},
			categorias: true,
			tags: true,
			redirect: false,
		}
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderMultiselect = this.renderMultiselect.bind(this);
    }
	
    componentDidMount(){
		let user = JSON.parse(localStorage.getItem('user'));
		console.log("user didmount: ", user );
        if(user !== null){
			this.setState({userLogged:true})
			this.props.fetchMe(user.user._id);
			this.props.fetchCities();
			this.props.fetchBairros('5ba26f813a018f42215a36a0', 200, 'nome');
            // if(user.user.role.name == 'Administrator'){
				//     this.props.fetchPerfilsByAdm(7);
                
				// }
				// else{
            //     this.props.fetchPerfilsByUser(user.user._id, 5);
			// }
			if(this.props.message){
				this.props.message.success = null;
				this.props.message.error = null;
			}
        }
        else{
            this.setState({userLogged:false})
        }
	}
	componentWillMount(){
		let user = JSON.parse(localStorage.getItem('user'));
		
		if(user !== null)
			this.props.fetchMe(user.user._id);
	}
	

	handleSubmit = (values) => {
        this.props.editUser(values, this.props.user._id);
	}
	

    datePtBr(date){
        //const options = {year: 'numeric', month: 'short', day: 'numeric' };
        //return date.toLocaleDateString('pt-BR', options)
        return date.toLocaleDateString('pt-BR')
    }

    
    getImageSrc(item){
        if(item.imagem_perfil){
            return item.imagem_perfil;
		}
		
        return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
    }

    renderField(field){
		const {input, label, type, meta: {touched, error, warning} } = field;
		if(type=='file')
			delete(input.value)

        return(
			
			<div className={`input-field-edit col ${field.classCol}`}>
				<label>{label}</label> 
				<input 
					{...input}  
					type={type} 
					disabled={field.disabled}
					className="validate" 
				/>
				{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
			</div>
            
        )
	}

	renderSelect(field){
		const {input, label, type, meta: {touched, error, warning} } = field;
		return(
			
			<div className={`input-field-edit col ${field.classCol}`}>
			
				{ <Field {...input} style={{display:'block',paddingTop:'0px', paddingBottom:'0px', height:(field.multiple)?'90px':'40px'}}  
					component="select" className="native" native="true" multiple={(field.multiple)?'multiple':''} disabled={field.disabled}>
					
					{(!field.multiple)?<option value="">{label}</option>:''}
					{(field.options)?field.options.map((option, key) => {
						if(_.isObject(option)){
							if(option._id && option.nome){
								return(
									<option key={`key-${label}-${option._id}`} value={option._id}>{option.nome}</option>
								)
							}
							else{
								return(
									<option key={`key-${label}-${Object.keys(option)[0]}`} value={Object.keys(option)[0]}>{Object.values(option)[0]}</option>
								)
							}
						}
						else{
							return(
								<option key={`key-${label}-${option}`} value={option}>{option}</option>
							)
						}
					}):''}
					
				</Field>}
				
				{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))} 
			</div>
            
        )
	}

	setCategoryParentName(categories){
		let newCat = categories.map(category => {
			if(category.parent_id && category.parent_id !== null){
				let pai = categories.filter(catFilter =>{
					//console.log(catFilter._id, ' * ', catFilter.nome, " ---- ", category.parent_id,  ' * ', category.nome)	
					return catFilter._id == category.parent_id
				})
				//console.log("categoria: ", category.nome , " - categoria pai: ", category.parent_id, " -- ", (pai[0])?pai[0].nome:'Categoria principal');
				category.parent_name = (pai[0])?pai[0].nome:'Sem Categoria Principal';
			}
			else{
				category.parent_name = 'Categoria Principal'
			}
			return category;
		})
		return newCat
	}

	proccessJsonForMultSelect(tags){
		if(tags){
			return  tags.map(tag => {
				return tag;
			})
		}
	}
	
	showMessage(){
		console.log("no show message: ", this.props.message);
        if(this.props.message){
            if(this.props.message.error && this.props.message.error.user){
                return(
                    <p className="text-danger text-center"><strong>{this.props.message.error.user.msg}</strong></p>
                )
            }
            else if(this.props.message.success && this.props.message.success.user){
                return(
                    <p className="text-success text-center"><strong>Perfil cadastrado com sucesso!</strong></p>
                )
            }
        }
	}
	
	renderMultiselect (field){
		const { input, data, valueField, textField, label } = field;

		return (
			<div className={`react-widget input-field-edit col ${field.classCol}`}>
				<label>{label}</label>
				<Multiselect {...input}
					onBlur={(e) => {
							//this.multiSelectBlur(e, input.name, input.value)
						}
					}
					value={input.value || []} // requires value to be an array
					data={data}
					valueField={valueField}
					textField={textField}
					inputProps={{id:field.id}}
					groupBy={field.groupBy}
					placeholder={(this.state[input.name] ===true)?label:''}
					allowCreate="onFilter"
        			onCreate={name => this.handleCreate(name)}
				/>
				
			</div>

		)
	}


	generalContent(){
		const { pristine, reset, submitting, handleSubmit } = this.props
		
		let cidades = [];
		if(this.props.cidades){
			cidades = this.props.cidades;
		}

		let bairros = [];
		if(this.props.bairros){
			bairros = this.props.bairros;
		}

		return(
			<div className="hom-cre-acc-left hom-cre-acc-right">
				<div className="">
					<form className="" onSubmit={handleSubmit(this.handleSubmit)}>
					<div className="row">
							<div className="db-v2-list-form-inn-tit-top">
								<h5>Imagem de Perfil <span className="v2-db-form-note">(tamanho da imagem 1000x1000):</span ></h5>
							</div>
						</div>
						<div className="row tz-file-upload">
							<Field
								name="imagem_perfil"
								component={this.renderField}
								type="file"
								classCol="s12"
								className="validate"
								validate={[myFile]}
							/>
							
						</div>
						<div className="row">
							<div className="db-v2-list-form-inn-tit">
								<h5>Dados Geral</h5>
							</div>
						</div>
						<div className="row">
							<Field
								name="name"
								component={this.renderField}
								type="text"
								label="Nome"
								classCol="s12"
								className="validate"
								validate={[ required ]}
							/>
						</div>
						
						<div className="row">
							<Field
								name="username"
								component={this.renderField}
								type="text"
								label="Usuário"
								classCol="s12"
								className="validate"
								validate={[ required ]}
							/>
						</div>
						
						<div className="row">
							<Field
								name="password"
								component={this.renderField}
								type="password"
								label="Senha"
								classCol="s6"
								className="validate"
								validate={[]}
							/>
							<Field
								name="confirm-password"
								component={this.renderField}
								type="password"
								label="Confirm a Senha"
								classCol="s6"
								className="validate"
								validate={[]}
							/>
						</div>
						<div className="row">
							
							<Field
								name="phone"
								component={this.renderField}
								type="text"
								label="Telefone"
								classCol="s4"
								className="validate"
								validate={[]}
							/>
							<Field
								name="mobile"
								component={this.renderField}
								type="text"
								label="Celular"
								classCol="s4"
								className="validate"
								validate={[]}
							/>
							<Field
								name="birthday"
								component={this.renderField}
								type="text"
								label="Data de Nascimento"
								classCol="s4"
								className="validate"
								{...dateMask}
							/>
						</div>
						<div className="row">
							<Field
								name="email"
								component={this.renderField}
								type="text"
								label="Email"
								classCol="s6"
								className="validate"
								disabled={true}
								validate={[email({allowBlank:true, message: "Email inválido!"})]}
							/>
							<Field
								name="website"
								component={this.renderField}
								type="text"
								label="Website"
								classCol="s6"
								className="validate"
								validate={[url({allowBlank:true, protocolIdentifier:false})]}
							/>
						</div>
						<div className="row">
							<div className="db-v2-list-form-inn-tit">
								<h5>Endereço:</h5>
							</div>
						</div>
						
						<div className="row">
							<Field
								name="cep"
								component={this.renderField}
								type="text"
								label="Cep"
								classCol="s3"
								className="validate"
								validate={[]}
							/>
						
							<Field
								name="address"
								component={this.renderField}
								type="text"
								label="Endereço"
								classCol="s9"
								className="validate"
								validate={[ ]}
							/>
						</div>
							
						<div className="row" style={{marginTop:'20px'}}>
							
							<Field
								name="cidade"
								component={this.renderSelect}
								options={cidades}
								label="Selecione a Cidade"
								classCol="s6"
								className="validate"
								validate={[]}
							/>
							<Field
								name="bairros"
								component={this.renderSelect}
								options={bairros}
								type="text"
								label="Selecione o Bairro"
								classCol="s6"
								className="validate"
								validate={[  ]}
							/>
							
						</div>
						<div className="row">
							<Field
									name="complement"
									component={this.renderField}
									type="text"
									label="Complemento"
									classCol="s12"
									className="validate"
									validate={[]}
								/>
							
						</div>

								
						<div className="row">
							<div className="input-field col s12 v2-mar-top-40"> 
								<input type="submit"  value="Editar" className="waves-effect waves-light no-color btn-large full-btn" /> 
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}



    render(){

        if(this.state.userLogged === false){
            return <Redirect to={'/'} />
		}
		
		let cidades = [];
		if(this.props.cidades){
			cidades = this.props.cidades;
		}

		let bairros = [];
		if(this.props.bairros){
			bairros = this.props.bairros;
		}
		const { pristine, reset, submitting, handleSubmit } = this.props
		
		
        return(

            <section>
                <div className="tz">
                    {/* <!--LEFT SECTION--> */}
                    <MenuDashboardLeft />
                    
                    { /*!--CENTER SECTION--> */}
                   
                    <div className="tz-2">
						<div className="tz-2-com tz-2-main">
							<h4>Meu Perfil</h4>
							<div className="db-list-com tz-db-table">
								<div className="ds-boar-title">
									<h2>Gerenciar Perfil</h2>
									<p>Editar dados do meu perfil</p>
									{this.showMessage()}
								</div>
								
								{this.generalContent()}
						
							</div>
						</div>
					</div>
                   
                    
                </div>
            </section>
        )
    }
}


function mapStateToProps(state){
	console.log("sateteee: ", state.users);
	let userInit = {}
	if(state.users){
		userInit = state.users;
		
		
		userInit.estado = '5bce2506e8a51373aab0b047';
		
		if(userInit.cidade){
			if(_.isArray(userInit.cidade) && userInit.cidade._id){
				userInit.cidade = userInit.cidade[0]._id;
			}
			else if(userInit.cidade._id){
				userInit.cidade = userInit.cidade._id;
			}
		}
		
		if(userInit.bairros && _.isArray(userInit.bairros) && userInit.bairros.length > 0){
			console.log("\n\n\n user init no map: ", userInit.bairros);
			userInit.bairros = userInit.bairros[0]._id;
		}
	}
    return(	
        {
            user: state.users,
			guias: state.guias,
			categorias: state.categorias,
			tags: state.tags,
			bairros: state.bairros,
			cidades: state.city,
			message: state.message,
			initialValues: userInit
        }
    )
    
}

const myForm = reduxForm({
	form: 'editProfile',
	enableReinitialize: true
	
})(Profile)

export default connect(mapStateToProps, {fetchMe, editUser, fetchCities, fetchBairros})(myForm);