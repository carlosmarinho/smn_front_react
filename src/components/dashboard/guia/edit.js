import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link, Redirect} from 'react-router-dom';
import {absence, url, email} from 'redux-form-validators';


import { fetchGuia, removeImageAssociation } from '../../../actions/guia';
import { fetchCategories } from '../../../actions/categoria';
import { fetchTags } from '../../../actions/tag';
import { fetchCities } from '../../../actions/city';
import { fetchBairros } from '../../../actions/bairro';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";


import DropdownList from 'react-widgets/lib/DropdownList'
import SelectList from 'react-widgets/lib/SelectList'
import Multiselect from 'react-widgets/lib/Multiselect'

import {editGuia} from '../../../actions/guia';

import 'react-widgets/dist/css/react-widgets.css'
import '../../../assets/styles/css/custom-materialize-edit.css';

const myFile = value => {
	if(value){
		if(value.length == 0)
			return undefined;
		
		if(value[0].type){

			console.log("meu value aqui: ", value)
	
			if(!value[0].type.includes('image'))
			 	return "O arquivo deve ser do tipo imagem";
				
			if(value[0].size < 1000){
			 	return "Tamanho do arquivo não pode ser menor que 1 KB";
			}
	
			if(value[0].size > 15 * 1024 * 1024){
			 	return "Tamanho do arquivo não pode ser maior que 10 MB";
			}
	
			console.log("ver o tipo: ", value[0].type.includes('image'));
		}	


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


class GuiaEdit extends Component{

    constructor(){
        super();

		this.state = {
			userLogged: null,
			labelMultiselect: {categorias: true, tags: true},
			categorias: true,
			tags: [],
			guia: null,
			tagInput: ''
		}
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderField = this.renderField.bind(this);
		this.renderMultiselect = this.renderMultiselect.bind(this);
    }
	
    componentDidMount(){
		let user = JSON.parse(localStorage.getItem('user'));
		
        if(user !== null){
			console.log("user aqui no dashboard: ", this.props.match.params.id);
			this.setState({userLogged:true})
			this.props.fetchCategories('guia comercial', 250, 'parent_id');
			this.props.fetchTags();
			this.props.fetchCities();
			this.props.fetchBairros('5ba26f813a018f42215a36a0', 200, 'nome');
			this.props.fetchGuia(this.props.match.params.id)
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
			
	componentWillMount(){
		this.props.fetchGuia(this.props.match.params.id)
	}
	
	handleSubmit(values){
        console.log("aqui no valllllllvalues vai enviar ", values);
        this.props.editGuia(values, this.props.match.params.id);
    }

	addTag(){
		
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

		let className = `col ${field.classCol}`

        return(
			
			<div className={`input-field-edit input-field ${className}`}>
				<input {...input}  type={type} className="validate" placeholder={label}  />
				{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
				
			</div>
            
        )
	}


	

	handleCreate(name){
		let obj = {...this.props.tags.list, 'nome': name}
		console.log("no handle create: ", obj)
		//this.setState({tags: obj})
	}

	renderMultiselect (field){
		const { input, data, valueField, textField, label } = field;

		//console.log("state do multiselect no multselect ", input.name, ": ", this.state.labelMultiselect[input.name]);
		return (
			<div className={`react-widget input-field col ${field.classCol}`}>
				<Multiselect {...input}
					/*onBlur={(e) => {
						this.multiSelectBlur(e, input.name, input.value)}
					}
					onFocus={(e) => this.multiSelectFocus(e, input.name) }*/
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
        if(this.props.message){
            if(this.props.message.error && this.props.message.error.guia){
                return(
                    <p className="text-danger text-center"><strong>{this.props.message.error.guia.msg}</strong></p>
                )
            }
            else if(this.props.message.success && this.props.message.success.guia){
                return(
                    <p className="text-success text-center"><strong>{this.props.message.success.guia.msg}</strong></p>
                )
            }
        }
    }

	removeImage(e, id){
		e.preventDefault();
		this.props.removeImageAssociation(id);
		console.log("removendo id: ", id);
	}

	showImagemDestacada(){
		if(this.props.guias && this.props.guias.guia && this.props.guias.guia.imagem_destacada){
			return(
				<div className="file-input">
					<img src={this.props.guias.guia.imagem_destacada.url} /><a href="#" onClick={e => this.removeImage(e, this.props.guias.guia.imagem_destacada._id)}>Remover</a>
				</div>
			)
		}
	}			

	showImagemGaleria(i){
		if(this.props.guias && this.props.guias.guia && this.props.guias.guia.galeria_imagens[i]){
			return(
				<div className="file-input">
					<img src={this.props.guias.guia.galeria_imagens[i].url} /><a href="#" onClick={e => this.removeImage(e, this.props.guias.guia.galeria_imagens[i]._id)}>Remover</a>
				</div>
			)
		}
	}

	galleryContent(){
		const { pristine, reset, submitting, handleSubmit } = this.props

		return(
			<div className="hom-cre-acc-left hom-cre-acc-right">
				<div className="">
					<form className="" onSubmit={handleSubmit(this.handleSubmit)}>
						<div className="row">
							<div className="db-v2-list-form-inn-tit-top">
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
								validate={ [myFile]}
							/>
							{this.showImagemGaleria(0)}
							<Field
								name="galeria_img[1]"
								component={this.renderField}
								type="file"
								classCol="s12"
								className="validate"
								validate={ [myFile]}
							/>
							{this.showImagemGaleria(1)}
							<Field
								name="galeria_img[2]"
								component={this.renderField}
								type="file"
								classCol="s12"
								className="validate"
								validate={ [myFile]}
							/>
							{this.showImagemGaleria(2)}
							<Field
								name="galeria_img[3]"
								component={this.renderField}
								type="file"
								classCol="s12"
								className="validate"
								validate={ [myFile]}
							/>
							{this.showImagemGaleria(3)}
							<Field
								name="galeria_img[4]"
								component={this.renderField}
								type="file"
								classCol="s12"
								className="validate"
								validate={ [myFile]}
							/>
							{this.showImagemGaleria(4)}
							<Field
								name="galeria_img[5]"
								component={this.renderField}
								type="file"
								classCol="s12"
								className="validate"
								validate={ [myFile]}
							/>
							{this.showImagemGaleria(5)}
							<Field
								name="galeria_img[6]"
								component={this.renderField}
								type="file"
								classCol="s12"
								className="validate"
								validate={ [myFile]}
							/>
							{this.showImagemGaleria(6)}
							<Field
								name="galeria_img[7]"
								component={this.renderField}
								type="file"
								classCol="s12"
								className="validate"
								validate={ [myFile]}
							/>
							{this.showImagemGaleria(7)}
							<Field
								name="galeria_img[8]"
								component={this.renderField}
								type="file"
								classCol="s12"
								className="validate"
								validate={ [myFile]}
							/>
							{this.showImagemGaleria(8)}
							<Field
								name="galeria_img[9]"
								component={this.renderField}
								type="file"
								classCol="s12"
								className="validate"
								validate={ [myFile]}
							/>
							{this.showImagemGaleria(9)}
						</div>									
								
						<div className="row">
							<div className="input-field col s12 v2-mar-top-40"> 
								<input type="submit"  value="Editar" className="waves-effect waves-light no-color btn-large full-btn" /> 
							</div>
						</div>
					</form>
				</div>
			</div>
		)
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
							{this.showImagemDestacada()}
							
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
									options={[{'guia comercial':'Guia Comercial'}, {'guia de serviços':'Guia de Serviços'}]}
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
								<input type="submit"  value="Editar" className="waves-effect waves-light no-color btn-large full-btn" /> 
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}


	
	midiaAndOtherContent(){
		const { pristine, reset, submitting, handleSubmit } = this.props

		let categorias = [];
		if(this.props.categorias){
			categorias = this.props.categorias.list;
			categorias = this.setCategoryParentName(categorias);
		}

		let tags = [];
		console.log("aqui o length: ", this.state.tags.length)
		if(this.state.tags.length > 0){
			tags = this.state.tags;
		}
		else if(this.props.tags){
			console.log("caiu aqui no props tags")
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

		return(
			<div className="hom-cre-acc-left hom-cre-acc-right">
				<div className="">
					<form className="" onSubmit={handleSubmit(this.handleSubmit)}>
						<div className="row">
							<div className="db-v2-list-form-inn-tit-top">
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
								validate={[url({allowBlank:true, protocolIdentifier:false})]}
							/>
							<Field
								name="googleplus"
								component={this.renderField}
								type="text"
								label="Google"
								value="https://www.googleplus.com/"
								classCol="s4"
								className="validate"
								validate={[url({allowBlank:true, protocolIdentifier:false})]}
							/>
							<Field
								name="twitter"
								component={this.renderField}
								type="text"
								label="Twitter"
								value="https://www.twitter.com/"
								classCol="s4"
								className="validate"
								validate={[url({allowBlank:true, protocolIdentifier:false})]}
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
								classCol="s9"
								/>
								{/*@todo implementar incluir nova tag*/}
								<div className="input-field col s3">
									<button  className="waves-effect waves-light btn" >Incluir nova Tag</button>
								</div>
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
									<h2>Editar Novo Guia</h2>
									<p>Cadastro de novo guia comercial/serviço</p>
									{this.showMessage()}
								</div>
								<Tabs>
									<TabList>
									<Tab>Geral</Tab>
									<Tab>Midia Social & Outros</Tab>
									<Tab>Galeria de fotos</Tab>
									</TabList>

									<TabPanel>
										{this.generalContent()}
									</TabPanel>
									<TabPanel>
										{this.midiaAndOtherContent()}
									</TabPanel>
									<TabPanel>
										{this.galleryContent()}
									</TabPanel>
								</Tabs>
								
							</div>
						</div>
					</div>
                   
                    
                </div>
            </section>
        )
    }
}


function mapStateToProps(state, ownProps){
	let guiaInit = {}
	if(state.guias && state.guias.guia){
		guiaInit = state.guias.guia;
		
		
		guiaInit.estado = '5bce2506e8a51373aab0b047';
		
		if(guiaInit.cidade && _.isArray(guiaInit.cidade)){
			guiaInit.cidade = guiaInit.cidade[0]._id;
		}

		if(guiaInit.bairros && _.isArray(guiaInit.bairros) && guiaInit.bairros.length > 0){
			console.log("\n\n\n guia init no map: ", guiaInit.bairros);
			guiaInit.bairros = guiaInit.bairros[0]._id;
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
			initialValues: guiaInit
        }
    )
}


const myForm = reduxForm({
	form: 'editGuia',
	enableReinitialize: true
	
})(GuiaEdit)

export default connect(mapStateToProps, {editGuia, fetchGuia, removeImageAssociation, fetchCategories, fetchTags, fetchCities, fetchBairros})(myForm);