var Comment = function (id, text, author) {
    this.text = text;
    this.author = author;
};

Comment.createEmpty = function () {
    return new Comment(null, null);
};