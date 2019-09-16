import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link, Redirect} from 'react-router-dom';
import {absence, url, email} from 'redux-form-validators';

import { fetchMe } from '../../../actions/user';
import { fetchComentarioByType, editComentario } from '../../../actions/comentario';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


import "react-tabs/style/react-tabs.css";



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
		}
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderField = this.renderField.bind(this);
    }
	
    async componentDidMount(){
		let user = JSON.parse(localStorage.getItem('user'));
		
        if(user !== null){
			this.setState({userLogged:user.user})
			this.props.fetchMe();
			console.log("propsparams;;;;::: ", this.props.match.params);
			await this.props.fetchComentarioByType(this.props.match.params.id, this.props.match.params.type)
		}
		else{
			this.setState({userLogged:false})
		}
	}	

	componentWillMount(){
		this.props.fetchComentarioByType(this.props.match.params.id, this.props.match.params.type)
	}
	
	handleSubmit(values){
		console.log("values antes: ", values);
		
		this.props.editComentario(
			values,
			this.props.match.params.id
		);
		window.scrollTo(0, 0);
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
								<h5>Comentário</h5>
							</div>
						</div>
						<div className="row">
							<Field
								name="titulo"
								component={this.renderField}
								type="text"
								label="Titulo - Ex.: Gostei muito do serviço..."
								classCol="s12"
								className="validate"
								validate={[]}
							/>
						</div>
						<div className="row">
							<div className="input-field-edit col s12">
								<label htmlFor="descricao">Comentário</label>
								<Field name="descricao" component="textarea" />
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
                    <MenuDashboardLeft user={this.props.user} />
                    
                    { /*!--CENTER SECTION--> */}
                   
                    <div className="tz-2">
						<div className="tz-2-com tz-2-main">
							<h4>Gerenciamento de Comentários</h4>
							<div className="db-list-com tz-db-table">
								<div className="ds-boar-title">
									<h2>Editar Comentário</h2>
									<p>Edição de comentário </p>
									{this.showMessage()}
								</div>
								<Tabs>
									<TabList>
										<Tab>Comentário</Tab>
									</TabList>

									<TabPanel>
										{this.generalContent()}
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
    return(
        {
            user: state.users,
			message: state.message,
			initialValues: state.comentarios
        }
    )
}


const myForm = reduxForm({
	form: 'editComentario',
	enableReinitialize: true
	
})(NoticiaEdit)

export default connect(mapStateToProps, {fetchMe, editComentario, fetchComentarioByType})(myForm);