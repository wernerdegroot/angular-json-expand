var BlogPost = function (title, fullText) {
    this.title = title;
    this.fullText = fullText;
};

BlogPost.createEmpty = function () {
    return new BlogPost(null, null);
};

BlogPost.prototype.getFirstSentence = function () {
    return this.fullText.split('.')[0] + '.';
};