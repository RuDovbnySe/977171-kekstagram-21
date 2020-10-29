'use strict';

const UserPictures = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);
const fotoOtherUsers = document.querySelector(`.pictures`);

const MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
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

const getRandomAvatar = () => {
  const randomFotoId = getRandomNumber(1, 7);
  const getFotoUrl = `img/avatar-${randomFotoId}.svg`;
  return getFotoUrl;
};

const generatecomment = () => {
  const comments = getRandomArrayItem(MESSAGES);
  const user = getRandomArrayItem(USERS_NAMES);
  const avatarUrl = getRandomAvatar();

  const OneComment = {
    avatar: avatarUrl,
    message: comments,
    name: user
  };
  return OneComment;
};

const generatePicture = (i) => {
  const descriptionFoto = getRandomArrayItem(DESCRIPTIONS);
  const urlPhoto = `photos/${i + 1}.jpg`;
  const likesCount = getRandomNumber(15, 200);
  const commentsCount = getRandomNumber(1, 10);
  const OnePicture = {
    url: urlPhoto,
    description: descriptionFoto,
    likes: likesCount,
    comment: commentsCount
  };
  return OnePicture;
};

let comments = [];
let pictures = [];

for (let i = 0; i < 25; i++) {
  const generateCommentData = generatecomment();
  comments.push(generateCommentData);
  const generatePicturesData = generatePicture(i);
  pictures.push(generatePicturesData);
}

for (let i = 1; i <= pictures.length; i++) {
  const pictureElement = UserPictures.cloneNode(true);

  pictureElement.querySelector(`.picture__img`).src = pictures[i].url;
  pictureElement.querySelector(`.picture__comments`).textContent = pictures[i].comment;
  pictureElement.querySelector(`.picture__likes`).textContent = pictures[i].likes;

  fotoOtherUsers.appendChild(pictureElement);
}
