import sqlite3 from "sqlite3";


    const DatabaseContainer = class DatabaseContainer extends Component {
        constructor() {
          super();
          this.state = {
          };
          this.handleChange = this.handleChange.bind(this);
        }
        handleChange(event) {
          this.setState({ [event.target.id]: event.target.value });
        }
        // componentWillUnmount() {
            

        // }
        render() {
          return (
                <h1>dbcontiner</h1>
          );
        }
      }
      
      export default DatabaseContainer;