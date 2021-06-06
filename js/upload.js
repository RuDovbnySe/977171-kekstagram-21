'use strict';
/* Добавление новой картинки в галерею (c применением эффектов, добавлением комментариев и хеш-тегов */

const uploadFileElement = document.querySelector(`#upload-file`);
const pictureEditorElement = document.querySelector(`.img-upload__overlay`);
const closePictureEditorBtn = pictureEditorElement.querySelector(`#upload-cancel`);

const previewElement = pictureEditorElement.querySelector(`.img-upload__preview`);
const previewPictureElement = previewElement.querySelector(`img`);

const uploadFormElement = document.querySelector(`#upload-select-image`);

const onPictureEditorEscPress = function (evt) {
  if (window.utils.isEscKeycode(evt)
    && window.utils.isFocusOnField(evt.target.tagName)) {
    closePictureEditor();
  }
};

const onClosePictureEditorBtnClick = function () {
  closePictureEditor();
};

/* Открытие блока с редактированием изображения */
const openPictureEditor = function (fileUrl) {
  previewPictureElement.src = fileUrl;
  document.body.classList.add(`modal-open`);
  pictureEditorElement.classList.remove(`hidden`);

  window.resizeImage.enableResizeImage(previewPictureElement);
  window.overlayEffect.enableApplicationEffect(previewPictureElement);

  document.addEventListener(`keydown`, onPictureEditorEscPress);
  closePictureEditorBtn.addEventListener(`click`, onClosePictureEditorBtnClick);

  window.validationField.enableValidationField();
  uploadFormElement.addEventListener(`submit`, onUploadFormElementSubmit);
};

const closePictureEditor = function () {
  pictureEditorElement.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);

  uploadFileElement.value = ``;

  document.removeEventListener(`keydown`, onPictureEditorEscPress);
  closePictureEditorBtn.removeEventListener(`click`, onClosePictureEditorBtnClick);

  window.resizeImage.disableResizeImage();
  window.overlayEffect.disableApplicationEffect();

  uploadFormElement.removeEventListener(`submit`, onUploadFormElementSubmit);

  window.validationField.disableValidationField();
};

const onLoadForm = function () {
  closePictureEditor();
  window.requestResult.displaySuccess();
};


const onErrorForm = function (message) {
  closePictureEditor();
  window.requestResult.displayError(message, true);
};

const onUploadFormElementSubmit = function (evt) {
  window.backend.upload(new FormData(uploadFormElement), onLoadForm, onErrorForm);
  evt.preventDefault();
};

const uploadFile = function () {
  uploadFileElement.addEventListener(`change`, function () {
    window.readFile(uploadFileElement, openPictureEditor);
  });
};

uploadFile();
