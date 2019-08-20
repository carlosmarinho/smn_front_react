import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link, Redirect} from 'react-router-dom';
import {absence, url, email} from 'redux-form-validators';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";


import { fetchCategories } from '../../../actions/categoria';
import { fetchTags } from '../../../actions/tag';
import { fetchCities } from '../../../actions/city';
import { fetchBairros } from '../../../actions/bairro';
import { SUCCESS_CREATE_NOTICIA } from '../../../actions/types';


import DropdownList from 'react-widgets/lib/DropdownList'
import SelectList from 'react-widgets/lib/SelectList'
import Multiselect from 'react-widgets/lib/Multiselect'

import 'react-widgets/dist/css/react-widgets.css'

import {createNoticia} from '../../../actions/noticia';

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


class NoticiaNew extends Component{

    constructor(){
        super();

		this.state = {
			userLogged: null,
			labelMultiselect: {categorias: true, tags: true},
			categorias: true,
			tags: true
		}
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderMultiselect = this.renderMultiselect.bind(this);
    }
	
    componentDidMount(){
		let user = JSON.parse(localStorage.getItem('user'));
		
        if(user !== null){
			this.setState({userLogged:true})
			this.props.fetchCategories('noticia comercial', 250, 'parent_id');
			this.props.fetchTags();
			this.props.fetchCities();
			this.props.fetchBairros('5ba26f813a018f42215a36a0', 200, 'nome');
            // if(user.user.role.name == 'Administrator'){
				//     this.props.fetchNoticiasByAdm(7);
                
				// }
				// else{
            //     this.props.fetchNoticiasByUser(user.user._id, 5);
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
	
	handleSubmit(values){
        
		this.props.createNoticia(values);
			
    }

    datePtBr(date){
        //const options = {year: 'numeric', month: 'short', day: 'numeric' };
        //return date.toLocaleDateString('pt-BR', options)
        return date.toLocaleDateString('pt-BR')
    }

    
    getImageSrc(item){
        if(item.s3_imagem_destacada){
            return item.old_imagem_destacada;
        }
        if(item.old_imagem_destacada) {
            return item.old_imagem_destacada;
        }
        else if(item.imagem_destacada){
            //implementar codigo
            return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
    }

    renderField(field){
		const {input, label, type, meta: {touched, error, warning} } = field;
		if(type=='file')
			delete(input.value)

        return(
			
			<div className={`input-field col ${field.classCol}`}>
				<input {...input}  type={type} className="validate" />
				{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
				<label>{label}</label> 
			</div>
            
        )
	}

	multiSelectFocus(e, name){
		
		if(name == 'tags')
				this.setState({tags: false});
		if(name == 'categorias')
			this.setState({categorias: false});
	}
	
	multiSelectBlur(e, itemName, itemValue){
		if(itemValue.length <= 0)
		{
			
			if(itemName == 'tags')
				this.setState({tags: true});
			if(itemName == 'categorias')
				this.setState({categorias: true});
		}
	}

	renderMultiselect (field){
		const { input, data, valueField, textField, label } = field;

		//console.log("state do multiselect no multselect ", input.name, ": ", this.state.labelMultiselect[input.name]);
		return (
			<div className={`react-widget input-field col ${field.classCol}`}>
				<Multiselect {...input}
					onBlur={(e) => {
						 this.multiSelectBlur(e, input.name, input.value)}
					}
					onFocus={(e) => this.multiSelectFocus(e, input.name) }
					value={input.value || []} // requires value to be an array
					data={data}
					valueField={valueField}
					textField={textField}
					inputProps={{id:field.id}}
					groupBy={field.groupBy}
				/>
				<label htmlFor={field.id} >{(this.state[input.name] ===true)?label:''}</label>
			</div>
		)
	}


	renderSelect(field){
		const {input, label, type, meta: {touched, error, warning} } = field;
		return(
			
			<div className={`input-field col ${field.classCol}`}>
			
				{ <Field {...input} style={{display:'block',paddingTop:'0px', paddingBottom:'0px', height:(field.multiple)?'90px':'40px'}}  
					component="select" className="native" native="true" multiple={(field.multiple)?'multiple':''} disabled={field.disabled}>
					
					{(!field.multiple)?<option>{label}</option>:''}
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
            if(this.props.message.error && this.props.message.error.noticia){
                return(
                    <p className="text-danger text-center"><strong>{this.props.message.error.noticia.msg}</strong></p>
                )
            }
            else if(this.props.message.success && this.props.message.success.noticia){
                return(
                    <p className="text-success text-center"><strong>Noticia cadastrado com sucesso!</strong></p>
                )
            }
        }
    }

	generalContent(){
		const { pristine, reset, submitting, handleSubmit } = this.props

		let categorias = [];
		if(this.props.categorias){
			categorias = this.props.categorias.list;
			categorias = this.setCategoryParentName(categorias);
		}

		let tags = [];
		if(this.props.tags){
			tags = this.props.tags.list;
			tags = this.proccessJsonForMultSelect(tags);
		}
		
		let cidades = [];
		if(this.props.cidades){
			cidades = this.props.cidades;
		}

		let bairros = [];
		if(this.props.tags){
			bairros = this.props.bairros;
		}

		return(
			<div className="hom-cre-acc-left hom-cre-acc-right">
				<div className="">
					<form className="" onSubmit={handleSubmit(this.handleSubmit)}>
					<div className="row">
							<div className="db-v2-list-form-inn-tit-top">
								<h5>Imagem Principal <span className="v2-db-form-note">(tamanho da imagem 1350x500):</span ></h5>
							</div>
						</div>
						<div className="row tz-file-upload">
							<Field
								name="imagem_principal"
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
								name="titulo"
								component={this.renderField}
								type="text"
								label="Título"
								classCol="s12"
								className="validate"
								validate={[ required ]}
							/>
						</div>
						<div className="row">
							<Field
									name="tipo"
									component={this.renderSelect}
									options={[{'noticia comercial':'Noticia Comercial'}, {'noticia de serviços':'Noticia de Serviços'}]}
									label="Selecione o tipo"
									classCol="s4"
									className="validate"
									validate={[required]}
							/>
							<Field
								name="telefone"
								component={this.renderField}
								type="text"
								label="Telefone"
								classCol="s4"
								className="validate"
								validate={[]}
							/>
							<Field
								name="celular"
								component={this.renderField}
								type="text"
								label="Celular"
								classCol="s4"
								className="validate"
								validate={[]}
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
							<div className="input-field input-field-edit col s12">
								<Field name="descricao" component="textarea" />
									
								<label htmlFor="descricao">Descrição</label>
							</div>
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
								classCol="s6"
								className="validate"
								validate={[]}
							/>
							
							<Field
								name="complemento"
								component={this.renderField}
								type="text"
								label="Complemento"
								classCol="s6"
								className="validate"
								validate={[]}
							/>
						</div>
						
						<div className="row">
							<Field
								name="estado"
								component={this.renderSelect}
								options={[{'5bce2506e8a51373aab0b047':'Rio de Janeiro'}]}
								type="text"
								label="Estado"
								disabled={true}
								defaultValue="5bce2506e8a51373aab0b047"
								classCol="s4"
								className="validate"
								validate={[ ]}
							/>
							<Field
								name="cidade"
								component={this.renderSelect}
								options={cidades}
								label="Cidade"
								classCol="s4"
								className="validate"
								validate={[required]}
							/>
							<Field
								name="bairros"
								component={this.renderSelect}
								options={bairros}
								type="text"
								label="Bairro"
								classCol="s4"
								className="validate"
								validate={[  ]}
							/>
						</div>
						<div className="row">
						

							<Field
								name="endereco"
								component={this.renderField}
								type="text"
								label="Endereço"
								classCol="s12"
								className="validate"
								validate={[ required ]}
							/>
						</div>
						
						

								
						<div className="row">
							<div className="input-field col s12 v2-mar-top-40"> 
								<input type="submit"  value="Cadastrar" className="waves-effect waves-light no-color btn-large full-btn" /> 
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

		if(this.props.message && this.props.message.success && this.props.message.success.noticia  ){
			console.log("noticias antes de direcionar: ", this.props.noticias);
			console.log("message antes de direcionar: ", this.props.message);
			return <Redirect to={`/dashboard/noticias/edit/${this.props.message.success.noticia.data._id}`} />
		}
		
		let categorias = [];
		if(this.props.categorias){
			categorias = this.props.categorias.list;
			categorias = this.setCategoryParentName(categorias);
		}

		let tags = [];
		if(this.props.tags){
			tags = this.props.tags.list;
			tags = this.proccessJsonForMultSelect(tags);
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
							<h4>Gerenciamento de Noticias</h4>
							<div className="db-list-com tz-db-table">
								<div className="ds-boar-title">
									<h2>Cadastrar Novo Noticia</h2>
									<p>Cadastro de novo noticia comercial/serviço</p>
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
    return(
        {
            user: state.users,
			noticias: state.noticias,
			categorias: state.categorias,
			tags: state.tags,
			bairros: state.bairros,
			cidades: state.city,
			message: state.message
        }
    )
    
}

const Connect = connect(mapStateToProps, {createNoticia, fetchCategories, fetchTags, fetchCities, fetchBairros})(NoticiaNew);

export default reduxForm({
	form: 'editNoticia',
	initialValues: {
		'estado': '5bce2506e8a51373aab0b047',
		'cidade': '5ba26f813a018f42215a36a0'
	}
})(Connect)