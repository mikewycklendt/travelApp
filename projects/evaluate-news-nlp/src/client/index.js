import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'
import { postData } from './js/postData'
import { updateUI } from './js/updateUI'
import { postURL } from './js/postURL'

import './styles/form.scss'
import './styles/header.scss'
import './styles/style.scss'
import './styles/footer.scss'

console.log("CHANGE!!");

console.log(process.env);

export {
    handleSubmit,
    postData,
    updateUI,
    postURL
}