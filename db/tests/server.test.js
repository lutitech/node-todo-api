const expect = require('expect');
const request = require('supertest');

var {app} = require('./server');

var {Todo}  = require('./models/todo');



describe('POST/todos', () => {
    it('should create todo', (done) =>{
        var text = 'Test to Text'

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err){
                return done(err)
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
            }).catch((e) => done(e));
        });
    });
});
