var BlogPost = function (title, fullText, comments) {
    this.title = title;
    this.fullText = fullText;
    this.comments = comments;
};

BlogPost.createEmpty = function () {
    return new BlogPost(null, null, null);
};

BlogPost.prototype.getFirstSentence = function () {
    return this.fullText.split('.')[0] + '.';
};