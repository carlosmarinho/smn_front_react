import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link, Redirect} from 'react-router-dom';

import {fetchGuiasByUser, fetchGuiasByAdm} from '../../../actions/guia';

const required = value => value ? undefined : 'Campo Obrigatório'

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

const maxLength15 = maxLength(15)

const minLength = min => value =>
    value && value.length < min ? `O campo deve conter no mínimo ${min} caracteres` : undefined;

class GuiaEdit extends Component{

    constructor(){
        super();

        this.state = {userLogged:null}
    }

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem('user'));
        console.log("user aqui no dashboard: ", user);

        if(user !== null){
            this.setState({userLogged:true})
            if(user.user.role.name == 'Administrator'){
                this.props.fetchGuiasByAdm(7);
                
            }
            else{
                this.props.fetchGuiasByUser(user.user._id, 5);
            }
        }
        else{
            this.setState({userLogged:false})
        }
    }

    datePtBr(date){
        //const options = {year: 'numeric', month: 'short', day: 'numeric' };
        //return date.toLocaleDateString('pt-BR', options)
        return date.toLocaleDateString('pt-BR')
    }

    showGuias(){
        if(this.props.guias && this.props.guias.fromUser){
            return this.props.guias.fromUser.map( guia => {
                
                return(
                    <tr key={guia.id}>
                        <td className="td-imagem"><img src={this.getImageSrc(guia)} alt="" /></td>
                        <td>{guia.titulo}</td>
                        <td>{this.datePtBr(new Date(guia.createdAt))}</td>
                        <td><span className="db-list-rat">{guia.tipo}</span>
                        </td>
                        <td><span className={(guia.status === false)?'db-list-ststus-na':'db-list-ststus'}>{(guia.status === false)?'Inativo':'Ativo'}</span>
                        </td>
                        <td className="table-information">
                            <Link to={'/dashboard/guias/edit/' + guia._id}  ><i className="fa fa-pencil" title="edit"></i></Link>  
                            <Link to={'/guia/' + guia.slug}  ><i className="fa fa-eye" title="view"></i></Link>
                            <Link to={'/dashboard/guias/delete/' + guia._id}  ><i className="fa fa-trash" title="delete"></i></Link>
                        </td>
                    </tr>
                )
                
            })
        }
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
	
	renderSelect(field){
		const {input, label, type, meta: {touched, error, warning} } = field;
		
		return(
			
			<div className={`input-field col ${field.classCol}`}>
				<Field name="favoriteColor" component="select">
					<option>{label}</option>
					<option value="ff0000">Red</option>
					<option value="00ff00">Green</option>
					<option value="0000ff">Blue</option>
				</Field>
				{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))} 
			</div>
            
        )
    }


    render(){
        if(this.state.userLogged === false){
            return <Redirect to={'/'} />
        }

        let totalGuias = 0;    
        
        
        if(this.props.guias && this.props.guias.fromUser)
            totalGuias = this.props.guias.fromUser.length;
        
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
							<h2>Editar Guia</h2>
							<p>Edição do guia comercial/serviço</p>
						</div>
						<div className="hom-cre-acc-left hom-cre-acc-right">
							<div className="">
								<form className="">
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
											validate={[ required ]}
										/>
										<Field
											name="celular"
											component={this.renderField}
											type="text"
											label="Celular"
											classCol="s6"
											className="validate"
											validate={[ required ]}
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
											validate={[ required ]}
										/>
										<Field
											name="website"
											component={this.renderField}
											type="text"
											label="Website"
											classCol="s6"
											className="validate"
											validate={[ required ]}
										/>
									</div>
									<div className="row">
										<div className="input-field col s12">
												<textarea id="textarea1" className="materialize-textarea">Taj Luxury Hotels & Resorts presents award winning luxury hotels and resorts in India, Indonesia, Mauritius, Egypt and Saudi Arabia.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution

	There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</textarea>
												<label for="textarea1">Listing Descriptions</label>
										</div>
									</div>
									<div className="row">
										<Field
											name="descricao"
											component={this.renderField}
											type="text"
											label="Descrição"
											classCol="s12"
											className="validate"
											validate={[ required ]}
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
											classCol="s6"
											className="validate"
											validate={[ required ]}
										/>
										
										<Field
											name="complemento"
											component={this.renderField}
											type="text"
											label="Complemento"
											classCol="s6"
											className="validate"
											validate={[ required ]}
										/>
									</div>
									{/*<div className="row">
										<div className="input-field col s12">
											<select>
												<option value="1">Free</option>
												<option value="2" selected>Premium</option>
												<option value="3">Premium Plus</option>
												<option value="3">Ultra Premium Plus</option>
											</select>
										</div>
									</div>*/}
									<div className="row">
										<Field
											name="estado"
											component={this.renderField}
											type="text"
											label="Estado"
											classCol="s4"
											className="validate"
											validate={[ required ]}
										/>
										<Field
											name="cidade"
											component={this.renderField}
											type="text"
											label="Cidade"
											classCol="s4"
											className="validate"
											validate={[ required ]}
										/>
										<Field
											name="bairro"
											component={this.renderField}
											type="text"
											label="Bairro"
											classCol="s4"
											className="validate"
											validate={[ required ]}
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
											validate={[ required ]}
										/>
										<Field
											name="google"
											component={this.renderField}
											type="text"
											label="Google"
											value="https://www.googleplus.com/"
											classCol="s4"
											className="validate"
											validate={[ required ]}
										/>
										<Field
											name="twitter"
											component={this.renderField}
											type="text"
											label="Twitter"
											value="https://www.twitter.com/"
											classCol="s4"
											className="validate"
											validate={[ required ]}
										/>
									</div>
									<div className="row">
									</div>
									<div className="row">
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
											label="Data funcionamento"
											classCol="s12"
											className="validate"
											validate={[ ]}
										/>
										<div className="input-field col s12">
											<select multiple>
												<option value="">All Days</option>
												<option value="" selected>Monday</option>
												<option value="" selected>Tuesday</option>
												<option value="" selected>Wednesday</option>
												<option value="" selected>Thursday</option>
												<option value="" selected>Friday</option>
												<option value="">Saturday</option>
												<option value="">Sunday</option>
											</select>
										</div>
									</div>
									<div class="row">
									<div class="input-field col s6">
										<select>
											<option value="" disabled selected>Open Time</option>
											<option value="">12:00 AM</option>
											<option value="">01:00 AM</option>
											<option value="">02:00 AM</option>
											<option value="">03:00 AM</option>
											<option value="">04:00 AM</option>
											<option value="">05:00 AM</option>
											<option value="">06:00 AM</option>
											<option value="">07:00 AM</option>
											<option value="">08:00 AM</option>
											<option value="">09:00 AM</option>
											<option value="">10:00 AM</option>
											<option value="">11:00 AM</option>
											<option value="">12:00 PM</option>
											<option value="">01:00 PM</option>
											<option value="">02:00 PM</option>
											<option value="">03:00 PM</option>
											<option value="">04:00 PM</option>
											<option value="">05:00 PM</option>
											<option value="">06:00 PM</option>
											<option value="">07:00 PM</option>
											<option value="">08:00 PM</option>
											<option value="">09:00 PM</option>
											<option value="">10:00 PM</option>
											<option value="">11:00 PM</option>											
										</select>
									</div>
									<div class="input-field col s6">
										<select>
											<option value="" disabled selected>Closing Time</option>
											<option value="">12:00 AM</option>
											<option value="">01:00 AM</option>
											<option value="">02:00 AM</option>
											<option value="">03:00 AM</option>
											<option value="">04:00 AM</option>
											<option value="">05:00 AM</option>
											<option value="">06:00 AM</option>
											<option value="">07:00 AM</option>
											<option value="">08:00 AM</option>
											<option value="">09:00 AM</option>
											<option value="">10:00 AM</option>
											<option value="">11:00 AM</option>
											<option value="">12:00 PM</option>
											<option value="">01:00 PM</option>
											<option value="">02:00 PM</option>
											<option value="">03:00 PM</option>
											<option value="">04:00 PM</option>
											<option value="">05:00 PM</option>
											<option value="">06:00 PM</option>
											<option value="">07:00 PM</option>
											<option value="">08:00 PM</option>
											<option value="">09:00 PM</option>
											<option value="">10:00 PM</option>
											<option value="">11:00 PM</option>	
										</select>
									</div>
								</div>
									<div className="row">
										<Field
											name="funcionamento_hora_inicial"
											component={this.renderField}
											type="text"
											label="Horário Inicial: Ex.: 10:00"
											value=""
											classCol="s6"
											className="validate"
											validate={[  ]}
										/>
										<Field
											name="funcionamento_hora_final"
											component={this.renderField}
											type="text"
											label="Horário Final: Ex.: 18:00"
											value=""
											classCol="s6"
											className="validate"
											validate={[  ]}
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
											validate={[  ]}
										/>
										<Field
											name="longitude"
											component={this.renderField}
											type="text"
											label="Longitude"
											value=""
											classCol="s6"
											className="validate"
											validate={[  ]}
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
											validate={[  ]}
										/>				
									</div>

									<div className="row">
										<div className="db-v2-list-form-inn-tit">
											<h5>Outros  <span className="v2-db-form-note">(Tipo, categorias e tags.)</span >
											</h5>
										</div>	
									</div>

									<div class="row">
										<div class="input-field col s6">
											<select multiple>
												<option value="" disabled selected>Selecione o tipo</option>
												<option value="">Comercial</option>
												<option value="">Serviços</option>
											</select>
										</div>
										<div class="input-field col s6">
											<select multiple>
												<option value="" disabled selected>Select Category</option>
												<option value="">Hotels & Resorts</option>
												<option value="">Real Estate</option>
												<option value="">Trainings</option>
												<option value="">Education</option>
												<option value="">Hospitals</option>
												<option value="">Transportation</option>
												<option value="">Automobilers</option>
												<option value="">Computer Repair</option>
												<option value="">Property</option>
												<option value="">Food Court</option>
												<option value="">Sports Events</option>
												<option value="">Tour & Travels</option>
												<option value="">Health Care</option>
												<option value="">Gym & Fitness</option>
												<option value="">Packers and Movers</option>
												<option value="">Interior Design</option>
												<option value="">Clubs</option>
												<option value="">Mobile Shops</option>
											</select>
										</div>
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
											validate={[  ]}
										/>
										<Field
											name="tag[]"
											component={this.renderField}
											type="text"
											label="Tag 2"
											value=""
											classCol="s4"
											className="validate"
											validate={[  ]}
										/>
										<Field
											name="tag[]"
											component={this.renderField}
											type="text"
											label="Tag 3"
											value=""
											classCol="s4"
											className="validate"
											validate={[  ]}
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
										<div className="input-field col s12 v2-mar-top-40"> <a className="waves-effect waves-light btn-large full-btn" href="#!">Update Listing</a> </div>
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

const Connect = connect(mapStateToProps, {fetchGuiasByUser, fetchGuiasByAdm})(GuiaEdit);

export default reduxForm({
	form: 'editGuia'
})(Connect)