import MyNavbar from "../components/navbar/MyNavbar";

const About = () => {
    return (
        <div>
            <MyNavbar/>
            <div className={"container"}>
                <h2 className={"text-center"}>About</h2>
                <p>This is a simple todo application built with React.</p>
                <p>Features:</p>
                <ul>
                    <li>Add, edit, and delete todos</li>
                    <li>Mark todos as completed</li>
                    <li>Filter todos by status (completed, active)</li>
                </ul>
                <p>Technologies used:</p>
                <ul>
                    <li>React</li>
                    <li>JavaScript</li>
                    <li>CSS</li>
                </ul>
                <p>Author: Your Name</p>
            </div>
        </div>
    )
}

export default About;