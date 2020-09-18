import React, {Component} from 'react'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import HeaderComponent from '../Header/HeaderComponent.js';
import UserNavbarComponent from '../Navbar/UserNavbarComponent.js';
import ArticleService from '../../services/Article/ArticleService.js'
import AlertDialog from '../Helpers/AlertDialog.js';
import PopUp from '../Helpers/PopUp.js'
import AuthenticationService from '../../services/Authentication/AuthenticationService.js';
import { ARTICLES_API_URL } from '../../Constants.js'

import './Articles.css'

class AllArticles extends Component {

    constructor(props) {
        super(props)

        this.state = {
            successMsg : '',
            errorMsg : '',
            articles : [],
            showModal: false
        }

        this.getAllArticles = this.getAllArticles.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    componentDidMount() {
        this.getAllArticles();
    }

    getAllArticles() {
        AuthenticationService.setupAxiosInterceptors()
    
        ArticleService.getAllArticles()
        .then(response => {
            this.setState({
                articles : response.data
            })
        })
        .catch(error => {
            this.setState({
                errorMsg : `Възникна някаква грешка ! Моля, опитайте отново.`
            })
        })
    }
    
    handleShowMoreButton (articleId) {
        let updatedArticles = this.state.articles
        updatedArticles.map(article => {
            if(article.uid === articleId){
                article.isShown = !article.isShown
            }
        })
        this.setState({ articles: updatedArticles })
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }
    
    render() {
        return (
            <>
            <HeaderComponent></HeaderComponent>
            <UserNavbarComponent></UserNavbarComponent>
            <div className="container">
                {this.state.successMsg !== '' && <AlertDialog alert="alert alert-success alert-dismissible" message={this.state.successMsg}></AlertDialog>}
                {this.state.errorMsg !== '' &&  <AlertDialog alert="alert alert-danger alert-dismissible" message={this.state.errorMsg}></AlertDialog>}
                <div className="row">
                {
                    this.state.articles.map(
                        article =>      
                        <Card className="card">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4">
                                        <CardMedia className="card-media"
                                            component="img"
                                            image={ARTICLES_API_URL + `/image/${article.uid}`}
                                            title={article.title}
                                            style={CardMediaStyle}>
                                        </CardMedia>
                                    </div>
                                    <div className="col-md-8">
                                        <CardContent className="card-body">
                                            <h5 className="card-header">{article.title}</h5>
                                            <p className="card-text">{article.content} <br/><br/> </p>
                                            <div className="form-row">
                                                <p className="form-group col-md-6"> Публикувано на: {article.createdDate}</p>
                                                <p className="form-group col-md-6"> Автор: {article.userFirstName} {article.userLastName}</p>
                                            </div>
                                            <button className="showMoreButton" onClick={() => this.handleShowMoreButton(article.uid)}>Покажи повече</button>
                                        </CardContent>
                                    </div>
                                </div>
                                <div>
                                <PopUp
                                    showModal={article.isShown} 
                                    title={article.title}
                                    body={article.content}
                                    customStyles={popUpStyles}
                                    closeAction={() => this.handleShowMoreButton(article.uid)}
                                    buttonAction={this.handleCloseModal} buttonName='Затвори'
                                    >
                                </PopUp>
                                </div>
                            </div>
                        </Card>
                    )
                }
                </div>
            </div>
        </>
        )
    }
}

const CardMediaStyle = {
    height: '100',
    width: '100',
    objectFit: 'cover'
};

const popUpStyles = {
    overlay: {
        position: 'fixed',
      },
      content: {
        position: 'absolute',
        margin: 'auto',
        top: '100px',
        left: '100px',
        right: '100px',
        bottom: '100px',
        width: '80%',
        height: '60%',
        overflow: 'auto',
        outline: 'none',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '1em',
        background: '#fafbfc',
        WebkitOverflowScrolling: 'touch',
      }
};

export default AllArticles