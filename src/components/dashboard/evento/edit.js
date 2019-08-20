import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link, Redirect} from 'react-router-dom';
import {absence, url, email} from 'redux-form-validators';
import DatePicker from "react-datepicker";


import { fetchEvento, removeImageAssociation } from '../../../actions/evento';
import { fetchCategories } from '../../../actions/categoria';
import { fetchTags } from '../../../actions/tag';
import { fetchCities } from '../../../actions/city';
import { fetchBairros } from '../../../actions/bairro';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


import Multiselect from 'react-widgets/lib/Multiselect'

import {editEvento} from '../../../actions/evento';

import "react-tabs/style/react-tabs.css";
import "react-datepicker/dist/react-datepicker.css";

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


class EventoEdit extends Component{

    constructor(){
        super();

		this.state = {
			userLogged: null,
			labelMultiselect: {categorias: true, tags: true},
			categorias: true,
			tags: [],
			evento: null,
			tagInput: '',
	        inicio: new Date(),
			fim: new Date(),

		}
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderField = this.renderField.bind(this);
		this.renderMultiselect = this.renderMultiselect.bind(this);
    }
	
    async componentDidMount(){
		let user = JSON.parse(localStorage.getItem('user'));
		
        if(user !== null){
			this.setState({userLogged:true})
			this.props.fetchCategories('evento comercial', 250, 'parent_id');
			this.props.fetchTags();
			this.props.fetchCities();
			this.props.fetchBairros('5ba26f813a018f42215a36a0', 200, 'nome');
			await this.props.fetchEvento(this.props.match.params.id)

			this.setState({inicio: new Date(this.props.eventos.evento.inicio)});
			this.setState({fim: new Date(this.props.eventos.evento.fim)});

            // if(user.user.role.name == 'Administrator'){
				//     this.props.fetchEventosByAdm(7);
                
				// }
				// else{
					//     this.props.fetchEventosByUser(user.user._id, 5);
					// }
				}
				else{
					this.setState({userLogged:false})
				}
			}
	componentWillReceiveProps(nextProps){
		if(nextProps && nextProps.eventos && this.state.inicio != null){
			console.log("recebendo as props de novo c valor antigo?", nextProps.eventos)
			
		}
	}

	componentWillMount(){
		this.props.fetchEvento(this.props.match.params.id)
	}
	
	handleSubmit(values){
		
        this.props.editEvento({...values, inicio: this.state.inicio, fim: this.state.fim}, this.props.match.params.id);
    }

	addTag(){
		
	}

    datePtBr(date){
        //const options = {year: 'numeric', month: 'short', day: 'numeric' };
        //return date.toLocaleDateString('pt-BR', options)
        return date.toLocaleDateString('pt-BR')
    }

    
    getImageSrc(item){
        const { s3_imagem_destacada, old_imagem_destacada, imagem_destacada } = item
        
        if(s3_imagem_destacada){
            return s3_imagem_destacada;
        }
        if(old_imagem_destacada) {
            if(old_imagem_destacada.includes('.amazonaws'))
                return old_imagem_destacada;

            return old_imagem_destacada.replace('http://soumaisniteroi', 'http://engenhoca.soumaisniteroi');;
        }
        else if(imagem_destacada){
            if(imagem_destacada.url){
                return imagem_destacada.url;
            }

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
	}

	renderMultiselect (field){
		const { input, data, valueField, textField, label } = field;

		return (
			<div className={`react-widget input-field col ${field.classCol}`}>
				<Multiselect {...input}
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

	renderCheckbox(field){
		const {input, label, type, meta: {touched, error, warning} } = field;


		let className = `col ${field.classCol}`

        return(
			<div>
				<div className={`react-widget input-field col s4`} style={{marginBottom: '50px'}}>
					<div className="sans-serif">{label}</div>
				</div>
				<div className={`react-widget input-field col s3`}>
					<input
						{...input}
						className="mr2"
						type="checkbox"
						checked={input.value}
						style={{ left: '0px', opacity: '1'}}
					/>
				</div>
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


	handleChangeInicio = (date) => {
		this.setState({
			inicio: date
		});
	}

	handleChangeFim = (date) => {
		this.setState({
			fim: date
		});
	}
	
	showMessage(){
        if(this.props.message){
            if(this.props.message.error && this.props.message.error.evento){
                return(
                    <p className="text-danger text-center"><strong>{this.props.message.error.evento.msg}</strong></p>
                )
            }
            else if(this.props.message.success && this.props.message.success.evento){
                return(
                    <p className="text-success text-center"><strong>{this.props.message.success.evento.msg}</strong></p>
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
		if(this.props.eventos && this.props.eventos.evento && this.props.eventos.evento.imagem_destacada){
			return(
				<div className="file-input">
					<img src={this.getImageSrc(this.props.eventos.evento)} /><a href="#" onClick={e => this.removeImage(e, this.props.eventos.evento.imagem_destacada._id)}>Remover</a>
				</div>
			)
		}
	}			

	showImagemGaleria(i){
		if(this.props.eventos && this.props.eventos.evento && this.props.eventos.evento.galeria_imagens){
			return(
				<div className="file-input">
					<img src={this.props.eventos.evento.galeria_imagens[i].url} /><a href="#" onClick={e => this.removeImage(e, this.props.eventos.evento.galeria_imagens[i]._id)}>Remover</a>
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
									name="classificacao_indicativa"
									component={this.renderSelect}
									options={[
										{'sem classificação indicativa':'Sem classificação indicativa'},
										{'livre':'Livre'},
										{'10 anos':'10 anos'},
										{'12 anos':'12 anos'},
										{'14 anos':'14 anos'},
										{'16 anos':'16 anos'},
										{'18 anos':'18 anos'},
									]}
									label="Selecione a Classificação Indicativa"
									classCol="s12"
									className="validate"
									validate={[required]}
							/>
						</div>
						<div className="row">
							<div className={`input-field-edit input-field col s6`}>
								<DatePicker
									selected={this.state.inicio}
									onChange={this.handleChangeInicio}
									dateFormat="dd/MM/yyyy"
								/>
							</div>
							<div className={`input-field-edit input-field col s6`}>
								<DatePicker
									selected={this.state.fim}
									onChange={this.handleChangeFim}
									dateFormat="dd/MM/yyyy"
								/>
							</div>

						</div>
						<div className="row">							
							<Field
								name="hora_inicio"
								component={this.renderField}
								type="text"
								label="Horário inicial do Evento"
								classCol="s6"
								className="validate"
								validate={[ required ]}
							/>
							<Field
								name="hora_fim"
								component={this.renderField}
								type="text"
								label="Horário final do Evento"
								classCol="s6"
								className="validate"
								validate={[ required ]}
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
								<h5>Endereço do Evento:</h5>
							</div>
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


	
	priceTagsAndOtherContent(){
		const { pristine, reset, submitting, handleSubmit } = this.props

		let categorias = [];
		if(this.props.categorias){
			categorias = this.props.categorias.list;
			categorias = this.setCategoryParentName(categorias);
		}

		let tags = [];
		if(this.state.tags.length > 0){
			tags = this.state.tags;
		}
		else if(this.props.tags){
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
								<h5>Informações de Preço:</h5>
							</div>
						</div>
						<div className="row">
							<Field
									name="classificacao_indicativa"
									component={this.renderCheckbox}
									options={['gratuito']}
									label="Evento é Gratuíto?"
									classCol="s12"
							/>
						</div>
						<div className="row">
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
							<h4>Gerenciamento de Eventos</h4>
							<div className="db-list-com tz-db-table">
								<div className="ds-boar-title">
									<h2>Editar Novo Evento</h2>
									<p>Cadastro de novo evento comercial/serviço</p>
									{this.showMessage()}
								</div>
								<Tabs>
									<TabList>
									<Tab>Geral</Tab>
									<Tab>Valores, Tags & Outros</Tab>
									<Tab>Galeria de fotos</Tab>
									</TabList>

									<TabPanel>
										{this.generalContent()}
									</TabPanel>
									<TabPanel>
										{this.priceTagsAndOtherContent()}
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
	let eventoInit = {}
	if(state.eventos && state.eventos.evento){
		eventoInit = state.eventos.evento;
				
		eventoInit.estado = '5bce2506e8a51373aab0b047';
		
		if(eventoInit.cidade){
			if(_.isArray(eventoInit.cidade)){	
				eventoInit.cidade = eventoInit.cidade[0]._id;
			}
			else if(eventoInit.cidade._id){
				eventoInit.cidade = eventoInit.cidade._id;
			}
		}

		console.log("stateeeeee: ", state)

		//this.setState({'inicio': eventoInit.inicio});

		if(eventoInit.bairros && _.isArray(eventoInit.bairros) && eventoInit.bairros.length > 0){
			console.log("\n\n\n evento init no map: ", eventoInit.bairros);
			eventoInit.bairros = eventoInit.bairros[0]._id;
		}
	}
    return(
        {
            user: state.users,
			eventos: state.eventos,
			categorias: state.categorias,
			tags: state.tags,
			bairros: state.bairros,
			cidades: state.city,
			message: state.message,
			initialValues: eventoInit
        }
    )
}


const myForm = reduxForm({
	form: 'editEvento',
	enableReinitialize: true
	
})(EventoEdit)

export default connect(mapStateToProps, {editEvento, fetchEvento, removeImageAssociation, fetchCategories, fetchTags, fetchCities, fetchBairros})(myForm);