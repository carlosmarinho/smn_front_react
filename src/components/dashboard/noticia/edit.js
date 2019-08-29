import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link, Redirect} from 'react-router-dom';
import {absence, url, email} from 'redux-form-validators';
import DatePicker from "react-datepicker";
import { createNumberMask, createTextMask } from 'redux-form-input-masks';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';


import { fetchMe } from '../../../actions/user';
import { fetchNoticia, removeImageAssociation } from '../../../actions/noticia';
import { fetchCategories } from '../../../actions/categoria';
import { fetchTags } from '../../../actions/tag';
import { fetchCities } from '../../../actions/city';
import { fetchBairros } from '../../../actions/bairro';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


import Multiselect from 'react-widgets/lib/Multiselect'

import {editNoticia} from '../../../actions/noticia';

import "react-tabs/style/react-tabs.css";
import "react-datepicker/dist/react-datepicker.css";

import 'react-widgets/dist/css/react-widgets.css'
import '../../../assets/styles/css/custom-materialize-edit.css';

const currencyMask = createNumberMask({
  prefix: 'R$ ',
  /*suffix: ' per item',*/
  decimalPlaces: 2,
  locale: 'pt-BR',
});

const horaMask = createTextMask({
	pattern: '99:99',
	suffix: ' hs',
});

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


class NoticiaEdit extends Component{

    constructor(){
        super();

		this.state = {
			userLogged: null,
			labelMultiselect: {categorias: true, tags: true},
			categorias: true,
			tags: [],
			noticia: null,
			tagInput: '',
			editorStateDescricao: EditorState.createEmpty(),

		}
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderField = this.renderField.bind(this);
		this.renderMultiselect = this.renderMultiselect.bind(this);
    }
	
    async componentDidMount(){
		let user = JSON.parse(localStorage.getItem('user'));
		
        if(user !== null){
			this.setState({userLogged:true})
			this.props.fetchMe();
			this.props.fetchCategories('notícia', 250, 'parent_id');
			this.props.fetchTags();
			this.props.fetchCities();
			this.props.fetchBairros('5ba26f813a018f42215a36a0', 200, 'nome');
			await this.props.fetchNoticia(this.props.match.params.id)

			//const plainText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
			//const content = ContentState.createFromText(plainText);
			const content = EditorState.createWithContent(convertFromRaw(this.props.noticias.noticia.descricaoJson))
			

			console.log("content convertido: ", content, ' ==== ', this.props.noticias.noticia.descricaoJson);

			this.setState({ editorStateDescricao: content })
			//this.setState({editorStateDescricao: EditorState.createWithContent(this.props.noticias.noticia.descricaoJson)})
		// if(user.user.role.name == 'Administrator'){
		//     this.props.fetchNoticiasByAdm(7);
		
		// }
		// else{
			//     this.props.fetchNoticiasByUser(user.user._id, 5);
			// }
		}
		else{
			this.setState({userLogged:false})
		}
	}

	

	componentWillMount(){
		this.props.fetchNoticia(this.props.match.params.id)
	}

	onEditorDescricaoStateChange = (editorState) => {
		this.setState({
			editorStateDescricao: editorState,
		});
	};
	
	handleSubmit(values){
		console.log("values antes: ", values);
		if(values.gratuito){
			values.preco = '';
		}

		this.props.editNoticia(
			{...values, 
				inicio: this.state.inicio,
				descricaoJson: convertToRaw(this.state.editorStateDescricao.getCurrentContent()),
				fim: this.state.fim
			}, 
			this.props.match.params.id
		);
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

			return old_imagem_destacada.replace('http://soumaisniteroi.com', 'http://images.soumaisniteroi.com');
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
			
			<div className={`input-field-edit  ${className}`}>
				<label htmlFor={label}>{label}</label>	
				<input {...input} id={label}  type={type} disabled={field.disabled} className="validate"  />
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

	renderCheckbox(field){
		const {input, label, type, meta: {touched, error, warning} } = field;

		let className = `col ${field.classCol}`
		console.log("Meu field: ", field);
        return(
			<div>
				<div className={`react-widget input-field col s3`} style={{marginBottom: '30px'}}>
					<div ><h5>{label}</h5></div>
				</div>
				<div className={`col s3`}>
					<input
						{...input}
						className="mr2"
						type="checkbox"
						defaultChecked={field.input.value}						
						style={{ left: '-250px', opacity: '1', marginTop: '7px'}}
						
					/>
				</div>
			</div>
            
        )
	}

	renderSelect = (field) => {
		const {input, label, type, meta: {touched, error, warning} } = field;
		
		return(
			
			<div className={`input-field-edit col ${field.classCol}`}>
				<label>{label}</label>
				<Field 
					{...input} 
					style={{display:'block',paddingTop:'0px', paddingBottom:'0px', height:(field.multiple)?'90px':'40px'}}  
					component="select" 
					className="native" 
					native="true" 
					multiple={(field.multiple)?'multiple':''} 
					disabled={field.disabled}
				>
					
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
					
				</Field>
				
				{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))} 
			</div>
            
        )
	}

	setCategoryParentName(categories){
		if(!categories)
			return null;
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
            if(this.props.message.error && this.props.message.error.noticia){
                return(
                    <p className="text-danger text-center"><strong>{this.props.message.error.noticia.msg}</strong></p>
                )
            }
            else if(this.props.message.success && this.props.message.success.noticia){
                return(
                    <p className="text-success text-center"><strong>{this.props.message.success.noticia.msg}</strong></p>
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
		if(this.props.noticias && this.props.noticias.noticia && this.props.noticias.noticia.imagem_destacada){
			return(
				<div className="file-input">
					<img src={this.getImageSrc(this.props.noticias.noticia)} /><a href="#" onClick={e => this.removeImage(e, this.props.noticias.noticia.imagem_destacada._id)}>Remover</a>
				</div>
			)
		}
	}			

	showImagemGaleria(i){
		if(this.props.noticias && this.props.noticias.noticia && this.props.noticias.noticia.galeria_imagens[i]){
			
			return(
				<div className="file-input">
					<img src={this.props.noticias.noticia.galeria_imagens[i].url} /><a href="#" onClick={e => this.removeImage(e, this.props.noticias.noticia.galeria_imagens[i]._id)}>Remover</a>
				</div>
			)
		}
	}

	locationContent(){
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
							<div className="input-field-edit col s12">
								<label htmlFor="introducao">Resumo</label>
								<Field name="introducao" component="textarea" />
							</div>
						</div>
						
						<div className="row">
							<div className="input-field-edit col s12">
								
								{/*<label htmlFor="descricao">Descrição</label>*/}
								<Editor
									editorState={this.state.editorStateDescricao}
									toolbarClassName="toolbarClassName"
									wrapperClassName="wrapperClassName"
									editorClassName="editorClassName"
									onEditorStateChange={this.onEditorDescricaoStateChange}
								/>		
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
								<h5>Tags e Categorias  
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
								<div className="input-field col s3" style={{marginTop: '40px'}}>
									<button  className="waves-effect waves-light btn" >Incluir nova Tag</button>
								</div>
						</div>			

						<div className="row">
							<div className="">
								<h5>Localização <span className="v2-db-form-note">(Estado, cidade, bairro):</span ></h5>
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
                    <MenuDashboardLeft user={this.props.user} />
                    
                    { /*!--CENTER SECTION--> */}
                   
                    <div className="tz-2">
						<div className="tz-2-com tz-2-main">
							<h4>Gerenciamento de Noticias</h4>
							<div className="db-list-com tz-db-table">
								<div className="ds-boar-title">
									<h2>Editar Noticia</h2>
									<p>Edição de noticia </p>
									{this.showMessage()}
								</div>
								<Tabs>
									<TabList>
									<Tab>Geral</Tab>
									<Tab>Tags, Categorias e Localização</Tab>
									</TabList>

									<TabPanel>
										{this.generalContent()}
									</TabPanel>
									<TabPanel>
										{this.priceTagsAndOtherContent()}
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
	let noticiaInit = {}
	if(state.noticias && state.noticias.noticia){
		noticiaInit = state.noticias.noticia;
				
		noticiaInit.estado = '5bce2506e8a51373aab0b047';
		
		if(noticiaInit.cidade){
			if(_.isArray(noticiaInit.cidade)){	
				noticiaInit.cidade = noticiaInit.cidade[0]._id;
			}
			else if(noticiaInit.cidade._id){
				noticiaInit.cidade = noticiaInit.cidade._id;
			}
		}

		if(noticiaInit.descricaoJson){
			//this.setState({ editorStateDescricao: noticiaInit.editorStateDescricao });
		}

		//this.setState({'inicio': noticiaInit.inicio});
		if(noticiaInit.bairros && _.isArray(noticiaInit.bairros) && noticiaInit.bairros.length > 0){
			noticiaInit.bairros = noticiaInit.bairros[0]._id;
		}
	}
    return(
        {
            user: state.users,
			noticias: state.noticias,
			categorias: state.categorias,
			tags: state.tags,
			bairros: state.bairros,
			cidades: state.city,
			message: state.message,
			initialValues: noticiaInit
        }
    )
}


const myForm = reduxForm({
	form: 'editNoticia',
	enableReinitialize: true
	
})(NoticiaEdit)

export default connect(mapStateToProps, {fetchMe, editNoticia, fetchNoticia, removeImageAssociation, fetchCategories, fetchTags, fetchCities, fetchBairros})(myForm);