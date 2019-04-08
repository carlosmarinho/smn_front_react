import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link, Redirect} from 'react-router-dom';

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
			labelMultiselct: true
		}
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderMultiselect = this.renderMultiselect.bind(this);
    }

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem('user'));
        console.log("user aqui no dashboard: ", user);

        if(user !== null){
            this.setState({userLogged:true})
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

        return(
			
			<div className={`input-field col ${field.classCol}`}>
				<input {...input}  type={type} className="validate" />
				{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
				<label>{label}</label> 
			</div>
            
        )
	}

	multiSelectFocus(e){
		this.setState({labelMultiselct:false});
	}
	
	multiSelectBlur(e, item){
		if(item.length <= 0)
			this.setState({labelMultiselct:true});
	}

	renderMultiselect (field){
		const { input, data, valueField, textField, label } = field;

		return (
			<div className={`react-widget input-field col ${field.classCol}`}>
				<Multiselect {...input}
					onBlur={(e) => {
						 this.multiSelectBlur(e, input.value)}
					}
					onFocus={(e) => this.multiSelectFocus(e) }
					value={input.value || []} // requires value to be an array
					data={data}
					valueField={valueField}
					textField={textField}
					inputProps={{id:field.id}}
				/>
				<label for={field.id} onClick="">{(this.state.labelMultiselct)?label:''}</label>
			</div>
		)
	}


	renderSelect(field){
		const {input, label, type, meta: {touched, error, warning} } = field;
		return(
			
			<div className={`input-field col ${field.classCol}`}>
			
				{ <Field {...input} style={{display:'block',paddingTop:'0px', paddingBottom:'0px', height:'40px'}}  component="select" className="native" native={true} multiple={(field.multiple)?'multiple':''}>
					{(!field.multiple)?<option>{label}</option>:''}
					{(field.options)?field.options.map(option => {
						return(
							<option value={option}>{option}</option>
						)
					}):''}
					
				</Field>}
				
				{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))} 
			</div>
            
        )
	}
	


    render(){
        if(this.state.userLogged === false){
            return <Redirect to={'/'} />
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
														
													<label for="descricao">Descrição</label>
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
													options={['niteroi']}
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
													classCol="s4"
													className="validate"
													validate={[]}
												/>
												<Field
													name="funcionamento_hora_final"
													component={this.renderField}
													options={['7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00',
															'15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','00:00',]}
													type="text"
													label="Horário Encerramento: Ex.: 18:00"
													value=""
													classCol="s4"
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

											<div class="row">
					
												
													<Field
														name="tipo"
														component={this.renderSelect}
														options={['Comercial', 'Serviços']}
														label="Selecione o tipo"
														classCol="s3"
														className="validate"
														validate={[]}
													/>
												
												<Field
													name="categorias"
													id="select-categorias"
													label="Escolha as categorias."
													component={this.renderMultiselect}
													data={[ 'Guitar', 'Cycling', 'Hiking', 
													'Guiffftar', 'Cyclinfwea333g', 'Hikingwwfqqf',
													'Gui34234tar', 'Cycli434ng', 'Hiking123' ]}
													classCol="s9"
												/>
											</div>
											
											
											<div className="row">
												<Field
													name="tag[]"
													component={this.renderField}
													type="text"
													label="tag 1"
													value=""
													classCol="s4"
													className="validate"
													validate={[]}
												/>
												<Field
													name="tag[]"
													component={this.renderField}
													type="text"
													label="Tag 2"
													value=""
													classCol="s4"
													className="validate"
													validate={[]}
												/>
												<Field
													name="tag[]"
													component={this.renderField}
													type="text"
													label="Tag 3"
													value=""
													classCol="s4"
													className="validate"
													validate={[]}
												/>								
											</div>							

											<div className="row">
												<div className="db-v2-list-form-inn-tit">
													<h5>Imagem Principal <span className="v2-db-form-note">(tamanho da imagem 1350x500):</span ></h5>
												</div>
											</div>
											<div className="row tz-file-upload">
												<div className="file-field input-field">
													<div className="tz-up-btn"> <span>File</span>
														<input type="file" /> </div>
													<div className="file-path-wrapper db-v2-pg-inp">
														<input className="file-path validate" type="text" /> 
													</div>
												</div>
											</div>
											<div className="row">
												<div className="db-v2-list-form-inn-tit">
													<h5>Photo Gallery <span className="v2-db-form-note">(upload multiple photos note:size 750x500):</span ></h5>
												</div>
											</div>
											<div className="row tz-file-upload">
												<div className="file-field input-field">
													<div className="tz-up-btn"> <span>File</span>
														<input type="file" multiple /> </div>
													<div className="file-path-wrapper db-v2-pg-inp">
														<input className="file-path validate" type="text" /> 
													</div>
												</div>
											</div>									
													
											<div className="row">
												<div className="input-field col s12 v2-mar-top-40"> 
													<input type="submit"  disabled={pristine || submitting} value="Atualizar Guia" className="waves-effect waves-light  btn-large full-btn" /> 
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
        }
    )
    
}

const Connect = connect(mapStateToProps, {createGuia})(GuiaNew);

export default reduxForm({
	form: 'editGuia'
})(Connect)