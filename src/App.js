import "./App.css";
import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import {useRef, useState} from "react";
import DefaultModal from "./components/DefaultModal";
import useTodoStore from "./stores/todoStore";
import Todo from "./models/Todo";
import TodoForm from "./components/todo/TodoForm";
import moment from "moment";
import MyNavbar from "./components/navbar/MyNavbar";

const App = () => {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const statusRef = useRef();
    const todoStatus = ['Pending', 'In Progress', 'Failed', 'Done']

    const {
        getAllTodoFromStore,
        addTodoToStore,
        addAllTodoToStore,
        updateTodoToStore,
    } = useTodoStore();

    const [todo, setTodo] = useState({});

    const filterableTodos = getAllTodoFromStore();

    const [todos, setTodos] = useState(filterableTodos);

    const handleSearch = (e) => {
        const keyword = e.target.value.trim();

        const fTodos = filterableTodos.filter((item) => {
            return item.title.toLowerCase().includes(keyword.toLowerCase());
        });

        setTodos(fTodos);
    };

    const handleDelete = (id) => {
        alert("Are you want to Delete?");
        const fTodos = filterableTodos.filter((item) => item.id !== id);

        setTodos(fTodos);
        addAllTodoToStore(fTodos);
    };

    const handleSave = (todo) => {
        todo = {
            ...new Todo(),
            title: todo.title,
            details: todo.details,
            status: todo.status,
        };
        addTodoToStore(todo);
        setTodos(getAllTodoFromStore());
        setShowModal(false);
    };

    const handleUpdate = (todo) => {
        updateTodoToStore(todo);
        setShowEditModal(false);
        setTodos(getAllTodoFromStore());
    };

    const filterByStatus = status => {
        const currentStatus = statusRef.current.value;
        // console.log(currentStatus);
        const allTodos = getAllTodoFromStore();
        switch (currentStatus) {
            case 'all' :
                setTodos(getAllTodoFromStore());
                break;
            default :
                // eslint-disable-next-line array-callback-return
                const filteredTodos = allTodos.filter(todo => {
                    if (todo.status === currentStatus) {
                        return todo;
                    }
                })
                setTodos(filteredTodos);
        }

    }

    return (
        <div className="App">
            <MyNavbar/>
            <Container className="mt-4">
                <div className="mb-4">
                    <Row>
                        <Col md={6}>
                            <FloatingLabel controlId="status" label="Status">
                                <Form.Select ref={statusRef} onChange={() => filterByStatus('status')}>
                                    <option value="all">All</option>
                                    {
                                        todoStatus.map((x, index) => {
                                            return (<option key={index} value={x}>{x}</option>)
                                        })
                                    }
                                </Form.Select>
                            </FloatingLabel>

                        </Col>
                        <Col md={6}>
                            <Form.Control
                                name="search"
                                placeholder="Search"
                                onChange={handleSearch}
                            />
                        </Col>
                    </Row>
                </div>

                <div className="row">
                    {todos.length > 0 &&
                        todos.map((todo, index) => {
                            return (
                                <div className="col-sm-4 mb-2" key={index}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{todo.title}</h5>
                                            <p className="card-text"
                                               style={{height: "75px", overflowY: "auto", scrollbarWidth: "thin"}}>
                                                {todo.details}
                                            </p>
                                            <p className="card-text">
                                                <b>{todo.status}</b>
                                            </p>
                                            <p className="card-text">
                                                {moment(todo.created_at).format("DD/MM/YYYY hh:mm:ss")}
                                            </p>
                                            <Button
                                                variant="btn btn-success me-2"
                                                onClick={() => {
                                                    setShowEditModal(true);
                                                    setTodo(todo);
                                                }}
                                            >
                                                {" "}
                                                Update{" "}
                                            </Button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(todo.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    <div className="col-sm-4 mb-2">
                        <div className="card">
                            <div className="card-body">
                                <img
                                    onClick={() => setShowModal(true)}
                                    src="/ADD.jpg"
                                    style={{width: "150px", cursor: "grabbing"}}
                                    alt="add"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <DefaultModal show={showModal} handleClose={() => setShowModal(false)}>
                <TodoForm handleSubmit={handleSave}/>
            </DefaultModal>

            <DefaultModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
            >
                <TodoForm handleSubmit={handleUpdate} defaultTodo={todo}/>
            </DefaultModal>
        </div>
    );
};

export default App;
