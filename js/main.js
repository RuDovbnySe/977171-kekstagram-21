'use strict';

const getUserPictures = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);
// const getUserPictures = document.querySelector('.picture');
const pool = document.querySelector(`.pictures`);

const MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать`,
  ` палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const USERS_NAMES = [
  `Иван`,
  `Елисей`,
  `Мария`,
  `Иннокентий`,
  `Виктор`,
  `Юлия`,
  `Платон`,
  `Евлампий`,
  `Роман`,
  `Фёдор`,
  `Кристина`
];

const DESCRIPTIONS = [
  `Фокус размыт.`,
  `Отличное фото`,
  `Класс!`,
  `Великолепно`,
  `Ну что за кривые руки?`,
  `Лучше бы и не брался!`,
  `Шикарно`,
  `Так себе`,
  `Ты можешь лучше`,
  `И я там был`,
  `Идеально`,
  `Супер кадр`,
  `Лучше удали`
];

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomNumber(0, array.length - 1);
  const element = array[randomIndex];
  return element;
};

const getRandomAvatar = (min, max) => {
  const randomFotoId = Math.floor(Math.random() * (max - min + 1) + min);
  const element = `img/avatar-${randomFotoId}.svg`;
  return element;
};

let commentArray = [];

for (let i = 0; i < 25; i++) {
  const comments = getRandomArrayItem(MESSAGES);
  const user = getRandomArrayItem(USERS_NAMES);
  const avatarUrl = getRandomAvatar(1, 7);

  const generateCommentData =
    {
      avatar: avatarUrl,
      message: comments,
      name: user
    };

  commentArray.push(generateCommentData);
}

let picture = [];

for (let i = 0; i < 25; i++) {
  const descriptions = getRandomArrayItem(DESCRIPTIONS);
  const urlPhoto = `photos/${i + 1}.jpg`;
  const like = getRandomNumber(15, 200);
  const numberComment = getRandomNumber(1, 10);

  const generatePictureData =
    {
      url: urlPhoto,
      description: descriptions,
      likes: like,
      comment: numberComment
    };

  picture.push(generatePictureData);
}

for (let i = 1; i <= picture.length; i++) {
  const pictureElement = getUserPictures.cloneNode(true);

  pictureElement.querySelector(`.picture__img`).src = picture[i].url;
  pictureElement.querySelector(`.picture__comments`).textContent = picture[i].comment;
  pictureElement.querySelector(`.picture__likes`).textContent = picture[i].likes;

  pool.appendChild(pictureElement);
}
