import React, {Component} from 'react'

import HeaderComponent from '../Header/HeaderComponent.js';
import UserNavbarComponent from '../Navbar/UserNavbarComponent.js';
import ArticleService from '../../services/Article/ArticleService.js'
import AlertDialog from '../Helpers/AlertDialog.js';
import AuthenticationService, { AUTHENTICATED_USER_EMAIL } from '../../services/Authentication/AuthenticationService.js';

import './PostArticle.css'

class PostArticle extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title : '',
            content : '',
            image : '',
            successMsg : '',
            errorMsg : ''
        }

        this.onPostArticleClick = this.onPostArticleClick.bind(this)
        this.onFileChangeHandler = this.onFileChangeHandler.bind(this)
    }

    onFileChangeHandler = (event) => {
        event.preventDefault();
        this.setState({
            selectedFile: event.target.files[0]
        });
    };

    updateTitleFieldValue(event) {
        this.setState({
            title : event.target.value
        })
    }

    updateContentFieldValue(event) {
        this.setState({
            content : event.target.value
        })
    }

    onPostArticleClick() {
        AuthenticationService.setupAxiosInterceptors()
        let userEmail = localStorage.getItem(AUTHENTICATED_USER_EMAIL)

        ArticleService.postArticle(this.state.title, this.state.content, userEmail, this.state.selectedFile)
        .then(() => {
            this.setState({
                successMsg : `Вашата статия беше публикувана успешно. Може да я намерите в отдел "Моите Статии".`
            })
        })
        .catch(error => {
            this.setState({
                errorMsg : `Възникна някаква грешка ! Моля, опитайте отново.`
            })
        })
    }

    render() {
        return (
            <>
            <HeaderComponent></HeaderComponent>
            <UserNavbarComponent></UserNavbarComponent>
            <div className="postArticleForm">
                {this.state.successMsg !== '' && <AlertDialog alert="alert alert-success alert-dismissible" message={this.state.successMsg}></AlertDialog>}
                {this.state.errorMsg !== '' &&  <AlertDialog alert="alert alert-danger alert-dismissible" message={this.state.errorMsg}></AlertDialog>}
                <div className="articleDetails">
                    <textarea className="form-control" type="text" name="title" 
                        placeholder="Въведи заглавие тук ..." cols="50" rows="3" onChange={event => this.updateTitleFieldValue(event)}>
                    </textarea>
                    <div className="input-group">
                        <div className="custom-file" color="secondary">
                            <input type="file" className="custom-file-input" id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01" onChange ={this.onFileChangeHandler}></input>
                            <label className="custom-file-label" for="inputGroupFile01"><i>Избери файл</i></label>
                        </div>
                    </div>
                    <button className="postArticleButton" type="submit" align="center" onClick={this.onPostArticleClick}>Публикувай</button>
                </div>
                <div className="articleContent">
                    <textarea className="form-control" type="text" name="content" wrap="off" 
                        placeholder="Въведи съдържание тук ..." rows="20" onChange={event => this.updateContentFieldValue(event)}>
                    </textarea>
                </div>
            </div>   
            </>
        )
    }
}

export default PostArticle