import Popup from './Popup.js';
import {
  srcPopUpViewImage,
  paragraphPopUpViewImage
} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({name, link, alt}) {
    srcPopUpViewImage.src = link;
    srcPopUpViewImage.alt = alt;
    paragraphPopUpViewImage.textContent = name;
    super.open();
  }
}
