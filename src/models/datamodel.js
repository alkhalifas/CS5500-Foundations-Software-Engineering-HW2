import data from "./model"

class Question {
    constructor(qid, title, text, tagIds, askedBy, askDate, ansIds, views) {
        this.qid = qid;
        this.title = title;
        this.text = text;
        this.tagIds = tagIds;
        this.askedBy = askedBy;
        this.askDate = askDate;
        this.ansIds = ansIds;
        this.views = views;
    }
}

class Answer {
    constructor(aid, text, ansBy, ansDate) {
        this.aid = aid;
        this.text = text;
        this.ansBy = ansBy;
        this.ansDate = ansDate;
    }
}

class Tag {
    constructor(tid, name) {
        this.tid = tid;
        this.name = name;
    }
}

class DataModel {
    constructor() {
        this.questions = [];
        this.answers = [];
        this.tags = [];
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new DataModel();
        }
        return this.instance;
    }

    loadData(data) {
        data.questions.forEach(questionData => {
            const question = new Question(
                questionData.qid,
                questionData.title,
                questionData.text,
                questionData.tagIds,
                questionData.askedBy,
                questionData.askDate,
                questionData.ansIds,
                questionData.views
            );
            this.questions.push(question);
        });

        data.answers.forEach(answerData => {
            const answer = new Answer(
                answerData.aid,
                answerData.text,
                answerData.ansBy,
                answerData.ansDate
            );
            this.answers.push(answer);
        });

        data.tags.forEach(tagData => {
            const tag = new Tag(tagData.tid, tagData.name);
            this.tags.push(tag);
        });
    }

    getAllQuestions() {
        return this.questions;
    }

    getQuestionTags(questionId) {
        const question = this.questions.find(q => q.qid === questionId);
        if (question) {
            return question.tagIds.map(tagId => this.tags.find(tag => tag.tid === tagId));
        }
        return [];
    }

    getQuestionAnswers(questionId) {
        const question = this.questions.find(q => q.qid === questionId);
        if (question) {
            return question.ansIds.map(answerId => this.answers.find(ans => ans.aid === answerId));
        }
        return [];
    }

    addQuestion(questionData) {
        const question = new Question(
            questionData.qid,
            questionData.title,
            questionData.text,
            questionData.tagIds,
            questionData.askedBy,
            questionData.askDate,
            questionData.ansIds || [],
            questionData.views || 0
        );
        this.questions.push(question);
        return question;
    }

    addAnswer(questionId, answerData) {
        const answer = new Answer(
            answerData.aid,
            answerData.text,
            answerData.ansBy,
            answerData.ansDate
        );
        this.answers.push(answer);
        const question = this.questions.find(q => q.qid === questionId);
        if (question) {
            question.ansIds.push(answerData.aid);
        }
        return answer;
    }

    getAllTags() {
        return this.tags;
    }

    incrementQuestionViews(questionId) {
        const question = this.questions.find(q => q.qid === questionId);
        if (question) {
            question.views += 1;
        }
    }
}

const dataModel = DataModel.getInstance();
dataModel.loadData(data);

export default dataModel;