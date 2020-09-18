import axios from "axios"

import { ARTICLES_API_URL } from '../../Constants.js'

class ArticleService {

    postArticle(title, content, userEmail, image) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('userEmail', userEmail);
        formData.append('image', image);

        return axios.post(ARTICLES_API_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' }})
    }
    
    getAllArticles() {
        return axios.get(ARTICLES_API_URL)
    }

    getMyArticles(email) {
        return axios.get(ARTICLES_API_URL + `/${email}`)
    }

    getArticleImage(articleId) {
        return axios.get(ARTICLES_API_URL + `/image/${articleId}`, { responseType: 'blob' })
    }

    getArticleById(articleId) {
        return axios.get(ARTICLES_API_URL + `/id/${articleId}`)
    }
}

export default new ArticleService()