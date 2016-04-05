import React,  { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index'
import { Link } from 'react-router';

import Input from 'react-toolbox/lib/input';

class PostsNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(formProps) {
        this.props.createPost(formProps)
            .then(() => {
                this.context.router.push('/');
            });
    }

    render() {
        let {fields: { title, categories, content }, handleSubmit } = this.props;
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Post</h3>
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                    <Input type='text' label="Title" {...title} />
                    <div className="text-help">
                        {title.touched ? title.error : ''}
                    </div>
                </div>

                <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories} />
                    <div className="text-help">
                        {categories.touched ? categories.error : ''}
                    </div>
                </div>

                <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                    <label>Content</label>
                    <textarea className="form-control" {...content} />
                    <div className="text-help">
                        {content.touched ? content.error : ''}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    let errors = {};

    if (!values.title) {
        errors.title = 'Enter a title';
    }

    if (!values.categories) {
        errors.categories = 'Enter some categories';
    }

    if (!values.content) {
        errors.content = 'Enter some content';
    }

    return errors;
}

export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createPost })(PostsNew);