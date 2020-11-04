'use strict';

const randomUserPictures = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);
const fotoOtherUsers = document.querySelector(`.pictures`);
const bigPicture = document.querySelector(`.big-picture`);
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentPearent = bigPicture.querySelector('.big-picture__social');
const closeBigPicture = bigPicture.querySelector('#picture-cancel');

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
  `Лучше бы и не брался!`,
  `Шикарно`,
  `Так себе`,
  `Ты можешь лучше`,
  `И я там был`,
  `Идеально`,
  `Супер кадр`,
  `Лучше удали`
];
const MAX_AVATAR = 6;
const MIN_LIKE = 15;
const MAX_LIKE = 200;
const MAX_COMMENT = 10;
const MIN_COMMENT = 0;
const NUMBER_PICTURE = 25;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomNumber(0, array.length - 1);
  const element = array[randomIndex];
  return element;
};

const getRandomAvatar = () => {
  const randomAvatarId = getRandomNumber(1, MAX_AVATAR);
  const getFotoUrl = `img/avatar-${randomAvatarId}.svg`;
  return getFotoUrl;
};

const createPicture = (i) => {
  const descriptionText = getRandomArrayItem(DESCRIPTIONS);
  const urlPhoto = `photos/${i + 1}.jpg`;
  const likesCount = getRandomNumber(MIN_LIKE, MAX_LIKE);
  const commentsCount = getRandomNumber(MIN_COMMENT, MAX_COMMENT);
  const pictureElementDate = {
    url: urlPhoto,
    description: descriptionText,
    likes: likesCount,
    comment: commentsCount
  };
  return pictureElementDate;
};
const createComment = () => {
  const commentText = getRandomArrayItem(MESSAGES);
  const userName = getRandomArrayItem(USERS_NAMES);
  const avatarUrl = getRandomAvatar();

  const commentElementDate = {
    avatar: avatarUrl,
    message: commentText,
    name: userName
  };
  return commentElementDate;
};

let pictures = [];
let comments = [];

for (let i = 0; i < MAX_COMMENT; i++) {
  const createCommentsData = createComment(i);
  comments.push(createCommentsData);
}

for (let i = 0; i < NUMBER_PICTURE; i++) {
  const createPicturesData = createPicture(i);
  pictures.push(createPicturesData);
}

for (let i = 0; i < pictures.length; i++) {
  const pictureElement = randomUserPictures.cloneNode(true);

  pictureElement.querySelector(`.picture__img`).src = pictures[i].url;
  pictureElement.querySelector(`.picture__comments`).textContent = pictures[i].comment;
  pictureElement.querySelector(`.picture__likes`).textContent = pictures[i].likes;

  fotoOtherUsers.appendChild(pictureElement);
}

commentsContainer.innerHTML = '';

const createCommentContainer = (array) => {
  const list = document.createElement('ul');
  list.classList.add('social__comments');
  for (let i = 0; i < array.length; i++) {
    const li = document.createElement('li');
    li.classList.add('social__comment');
    list.appendChild(li);
    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.setAttribute('src', array[i].avatar);
    img.setAttribute('alt', array[i].name);
    li.appendChild(img);
    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = array[i].message;
    li.appendChild(p);
  }

  return list;
};

fotoOtherUsers.addEventListener('click', function (evt) {
  evt.preventDefault();
  bigPicture.querySelector('.big-picture__img img').src = pictures[0].url;
  bigPicture.querySelector('.likes-count').textContent = pictures[0].likes;
  bigPicture.querySelector('.comments-count').textContent = pictures[0].comment;
  bigPicture.querySelector('.social__caption').textContent = pictures[0].description;


  commentPearent.appendChild(createCommentContainer(comments));

  bigPicture.classList.remove('hidden');
});

closeBigPicture.addEventListener('click', function (evt) {
  evt.preventDefault();
  bigPicture.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
});
