import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link, Redirect} from 'react-router-dom';
import {absence, allowBlank, file} from 'redux-form-validators';



import { fetchCategories } from '../../../actions/categoria';
import { fetchTags } from '../../../actions/tag';
import { fetchBairros } from '../../../actions/bairro';


import DropdownList from 'react-widgets/lib/DropdownList'
import SelectList from 'react-widgets/lib/SelectList'
import Multiselect from 'react-widgets/lib/Multiselect'

import 'react-widgets/dist/css/react-widgets.css'

import {createGuia} from '../../../actions/guia';

const required = value => value ? undefined : 'Campo Obrigatório'

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Campo de Email inválido' : undefined


const maxLength15 = maxLength(15)

const minLength = min => value =>
    value && value.length < min ? `O campo deve conter no mínimo ${min} caracteres` : undefined;


class GuiaNew extends Component{

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
        console.log("user aqui no dashboard: ", user);
		
        if(user !== null){
			this.setState({userLogged:true})
			this.props.fetchCategories('guia comercial', 250, 'parent_id');
			this.props.fetchTags();
			this.props.fetchBairros('5ba26f813a018f42215a36a0', 200, 'nome');
            // if(user.user.role.name == 'Administrator'){
				//     this.props.fetchGuiasByAdm(7);
                
				// }
				// else{
            //     this.props.fetchGuiasByUser(user.user._id, 5);
            // }
        }
        else{
            this.setState({userLogged:false})
        }
	}
	
	handleSubmit(values){
        console.log("aqui no valllllllvalues", values);
        this.props.createGuia(values);
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
			
				{ <Field {...input} style={{display:'block',paddingTop:'0px', paddingBottom:'0px', height:(field.multiple)?'90px':'40px'}}  component="select" className="native" native="true" multiple={(field.multiple)?'multiple':''}>
					{(!field.multiple)?<option>{label}</option>:''}
					{(field.options)?field.options.map((option, key) => {
						if(_.isObject(option)){
							return(
								<option key={`key-${Object.keys(option)[0]}`} value={Object.keys(option)[0]}>{Object.values(option)[0]}</option>
							)
						}
						else{
							return(
								<option key={`key-${option}`} value={option}>{option}</option>
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
            if(this.props.message.error && this.props.message.error.guia){
                return(
                    <p className="text-danger text-center"><strong>{this.props.message.error.guia.msg}</strong></p>
                )
            }
            else if(this.props.message.success && this.props.message.success.guia){
                return(
                    <p className="text-success text-center"><strong>Guia cadastrado com sucesso!</strong></p>
                )
            }
        }
    }


    render(){

        if(this.state.userLogged === false){
            return <Redirect to={'/'} />
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
		
		let bairros = [];
		if(this.props.tags){
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
							<h4>Gerenciamento de Guias</h4>
							<div className="db-list-com tz-db-table">
								<div className="ds-boar-title">
									<h2>Cadastrar Novo Guia</h2>
									<p>Cadastro de novo guia comercial/serviço</p>
									{this.showMessage()}
								</div>
								<div className="hom-cre-acc-left hom-cre-acc-right">
									<div className="">
										<form className="" onSubmit={handleSubmit(this.handleSubmit)}>
													
								
											
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
													name="telefone"
													component={this.renderField}
													type="text"
													label="Telefone"
													classCol="s6"
													className="validate"
													validate={[]}
												/>
												<Field
													name="celular"
													component={this.renderField}
													type="text"
													label="Celular"
													classCol="s6"
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
													validate={[required, email]}
												/>
												<Field
													name="website"
													component={this.renderField}
													type="text"
													label="Website"
													classCol="s6"
													className="validate"
													validate={[ ]}
												/>
											</div>
											<div className="row">
												<div className="input-field col s12">
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
													options={['Rio de Janeiro']}
													type="text"
													label="Estado"
													classCol="s4"
													className="validate"
													validate={[  ]}
												/>
												<Field
													name="cidade"
													component={this.renderSelect}
													options={[{'5ba26f813a018f42215a36a0':'niteroi'}]}
													label="Cidade"
													classCol="s4"
													className="validate"
													validate={[  ]}
												/>
												<Field
													name="bairro"
													component={this.renderSelect}
													options={['fonseca','icaraí','engenhoca']}
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
												<div className="db-v2-list-form-inn-tit">
													<h5>Informações de Mídia Social:</h5>
												</div>
											</div>
											<div className="row">
												<Field
													name="facebook"
													component={this.renderField}
													type="text"
													label="Facebook"
													value="https://www.facebook.com/"
													classCol="s4"
													className="validate"
													validate={[]}
												/>
												<Field
													name="google"
													component={this.renderField}
													type="text"
													label="Google"
													value="https://www.googleplus.com/"
													classCol="s4"
													className="validate"
													validate={[]}
												/>
												<Field
													name="twitter"
													component={this.renderField}
													type="text"
													label="Twitter"
													value="https://www.twitter.com/"
													classCol="s4"
													className="validate"
													validate={[]}
												/>
											</div>
											<div className="row">
												<div className="db-v2-list-form-inn-tit">
													<h5>Data e Hora de Funcionamento:</h5>
												</div>
											</div>
											<div className="row">
												
												<Field
													name="diasfuncionamento"
													component={this.renderSelect}
													options={['Todos os dias', 'Segunda', 'Terça', 'Quarta']}
													label="Data funcionamento"
													classCol="s4"
													multiple="true"
													className="validate"
													validate={[]}
												/>
												<Field
													name="funcionamento_hora_inicial"
													component={this.renderSelect}
													options={['7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00',
															'15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','00:00',]}
													type="text"
													label="Horário Abertura: Ex.: 10:00"
													value=""
													classCol="s8"
													className="validate"
													validate={[]}
												/>
												<Field
													name="funcionamento_hora_final"
													component={this.renderSelect}
													options={['7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00',
															'15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','00:00',]}
													type="text"
													label="Horário Encerramento: Ex.: 18:00"
													value=""
													classCol="s8"
													className="validate"
													validate={[]}
												/>
											</div>
											
													
											<div className="row">
												<div className="db-v2-list-form-inn-tit">
													<h5>Google Map <span className="v2-db-form-note">(Informe a latitude e longitude ou o código iframe.)</span >
													</h5>
												</div>	
											</div>
											<div className="row">
												<Field
													name="latitude"
													component={this.renderField}
													type="text"
													label="Latitude"
													value=""
													classCol="s6"
													className="validate"
													validate={[]}
												/>
												<Field
													name="longitude"
													component={this.renderField}
													type="text"
													label="Longitude"
													value=""
													classCol="s6"
													className="validate"
													validate={[]}
												/>								
											</div>									
											<div className="row">
												<Field
													name="google-map-iframe"
													component={this.renderField}
													type="text"
													label="Informe o seu código do iframe aqui"
													value=""
													classCol="s12"
													className="validate"
													validate={[]}
												/>				
											</div>

											<div className="row">
												<div className="db-v2-list-form-inn-tit">
													<h5>Outros  <span className="v2-db-form-note">(Tipo, categorias e tags.)</span >
													</h5>
												</div>	
											</div>

											<div className="row">												
													<Field
														name="tipo"
														component={this.renderSelect}
														options={[{'guia comercial':'Guia Comercial'}, {'guia de serviços':'Guia de Serviços'}]}
														label="Selecione o tipo"
														classCol="s3"
														className="validate"
														validate={[]}
													/>
												
												<Field
													name="categorias"
													id="select-categorias"
													label="Escolha as categorias. (Digite para filtrar)"
													component={this.renderMultiselect}
													textField='nome'
													valueField='id'
													data={categorias}
													classCol="s9"
													groupBy='parent_name'
												/>
											</div>

											<div className="row">																								
												<Field
													name="tags"
													id="select-tags"
													label="Escolha as tags. (Digite para filtrar)"
													component={this.renderMultiselect}
													textField='nome'
													valueField='id'
													data={tags}
													classCol="s8"
													/>
													{/*@todo implementar incluir nova tag*/}
													<div className="input-field col s4">
														<button  className="waves-effect waves-light btn" >Incluir nova Tag</button>
													</div>
											</div>			

											<div className="row">
												<div className="db-v2-list-form-inn-tit">
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
													validate={ [absence, file({accept: 'image/*', maxSize:'20 MB', allowBlank: true})]}
												/>			
											</div>


											<div className="row">
												<div className="db-v2-list-form-inn-tit">
													<h5>Photo Gallery <span className="v2-db-form-note">(upload multiple photos note:size 750x500):</span ></h5>
												</div>
											</div>

											<div className="row tz-file-upload">
												<Field
													name="galeria_img[0]"
													component={this.renderField}
													type="file"
													classCol="s12"
													className="validate"
													validate={ [absence, file({accept: 'image/*', maxSize:'20 MB', allowBlank: true})]}
												/>
												<Field
													name="galeria_img[1]"
													component={this.renderField}
													type="file"
													classCol="s12"
													className="validate"
													validate={ [absence, file({accept: 'image/*', maxSize:'20 MB', allowBlank: true})]}
												/>
												<Field
													name="galeria_img[2]"
													component={this.renderField}
													type="file"
													classCol="s12"
													className="validate"
													validate={ [absence, file({accept: 'image/*', maxSize:'20 MB', allowBlank: true})]}
												/>
												<Field
													name="galeria_img[3]"
													component={this.renderField}
													type="file"
													classCol="s12"
													className="validate"
													validate={ [absence, file({accept: 'image/*', maxSize:'20 MB', allowBlank: true})]}
												/>
												<Field
													name="galeria_img[4]"
													component={this.renderField}
													type="file"
													classCol="s12"
													className="validate"
													validate={ [absence, file({accept: 'image/*', maxSize:'20 MB', allowBlank: true})]}
												/>
												<Field
													name="galeria_img[5]"
													component={this.renderField}
													type="file"
													classCol="s12"
													className="validate"
													validate={ [absence, file({accept: 'image/*', maxSize:'20 MB', allowBlank: true})]}
												/>
												<Field
													name="galeria_img[6]"
													component={this.renderField}
													type="file"
													classCol="s12"
													className="validate"
													validate={ [absence, file({accept: 'image/*', maxSize:'20 MB', allowBlank: true})]}
												/>
												<Field
													name="galeria_img[7]"
													component={this.renderField}
													type="file"
													classCol="s12"
													className="validate"
													validate={ [absence, file({accept: 'image/*', maxSize:'20 MB', allowBlank: true})]}
												/>
												<Field
													name="galeria_img[8]"
													component={this.renderField}
													type="file"
													classCol="s12"
													className="validate"
													validate={ [absence, file({accept: 'image/*', maxSize:'20 MB', allowBlank: true})]}
												/>
												<Field
													name="galeria_img[9]"
													component={this.renderField}
													type="file"
													classCol="s12"
													className="validate"
													validate={ [absence, file({accept: 'image/*', maxSize:'20 MB', allowBlank: true})]}
												/>
											</div>									
													
											<div className="row">
												<div className="input-field col s12 v2-mar-top-40"> 
													{/*Cadastrar Guia*/}<input type="submit"  value="Cadastrar" className="waves-effect waves-light no-color btn-large full-btn" /> 
												</div>
											</div>
										</form>
									</div>
								</div>
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
			guias: state.guias,
			categorias: state.categorias,
			tags: state.tags,
			bairros: state.bairros,
			message: state.message
        }
    )
    
}

const Connect = connect(mapStateToProps, {createGuia, fetchCategories, fetchTags, fetchBairros})(GuiaNew);

export default reduxForm({
	form: 'editGuia'
})(Connect)