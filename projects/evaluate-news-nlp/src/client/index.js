import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'
import { apiCall } from './js/apiCall'
import { postData } from './js/postData'
import { updateUI } from './js/updateUI'

import './styles/form.scss'
import './styles/header.scss'
import './styles/style.scss'
import './styles/footer.scss'

console.log("CHANGE!!");

console.log(process.env);

export {
    handleSubmit,
    apiCall,
    postData,
    updateUI
}