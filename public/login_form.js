class Page extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isSign: false,
            isLogin: false,
            id:'',
            password:'',
            username:'',
            email:'',
            address:'',
        };
    }

    log_out(){
        console.log("logout");
        this.setState({
            isLogin: false,
            id:'',
            password:'',
            username:'',
            email:'',
            address:'',
        });
    }

    log_in(id, password){
        console.log("login");
        axios.get("/user",{params:{id:id,password:password}},{'Content-Type':'application/json'})
        .then((res)=>{
            this.setState({
                isLogin: true,
                username:res.data.name,
                email:res.data.email,
                address:res.data.address
            });
        });
    }

    sign_page(){
        console.log("sign_page");
        this.setState({
            isSign: true,
            id:'',
            password:'',
            username:'',
            email:'',
            address:'',
        });
    }

    sign_up(user){
        console.log("sign_up");
        console.log(user);
        axios.post("/user",{
            id:user.id,
            password:user.password,
            name:user.username,
            email:user.email,
            address:user.address
        },{'Content-Type':'application/json'})
        .then(()=>{
            this.setState({
                isSign: false,
                id:'',
                password:''
            });
        });
    }

    update(user){
        console.log("sign_up");
        console.log(user);
        axios.put("/user/"+user.id,{
            password:user.password,
            name:user.username,
            email:user.email,
            address:user.address
        },{'Content-Type':'application/json'})
        .then(()=>{
            this.setState({
                isLogin: false,
                id:'',
                password:''
            });
        });
    }

    inputHandler(e){
        this.setState({[e.target.name]:e.target.value});
    }

    loginPage(){
        return (
            <div style={{textAlign:'center', alignItem:'center'}}>
                <div style={{display:'grid',margin:'200px'}}>
                    <input name="id" style={{padding:'10px', margin:'10px'}} type="text" placeholder="id" onChange={(e)=>this.inputHandler(e)} value={this.state.id}></input>
                    <input name="password" style={{padding:'10px', margin:'10px'}} type="password" placeholder="password" onChange={(e)=>this.inputHandler(e)} value={this.state.password}></input>
                    <div style={{display:'inline-block', padding:'10px',margin:'10px'}}>
                        <button style={{padding:'10px', margin:'10px'}} onClick={()=>{this.log_in(this.state.id,this.state.password);}}>Login</button>
                        <button style={{padding:'10px', margin:'10px'}} onClick={()=>{this.sign_page()}}>Sign Up</button>
                    </div>
                </div>
            </div>
        );
    }

    signPage(){
        return (
            <div style={{textAlign:'center', alignItem:'center'}}>
                <div style={{display:'grid',margin:'200px'}}>
                    <input disabled={this.state.isLogin ? "disabled":""} name="id" style={{padding:'10px', margin:'10px'}} type="text" placeholder="id" onChange={(e)=>this.inputHandler(e)} value={this.state.id}></input>
                    <input name="password" style={{padding:'10px', margin:'10px'}} type="password" placeholder="password" onChange={(e)=>this.inputHandler(e)} value={this.state.password}></input>
                    <input name="username" style={{padding:'10px', margin:'10px'}} type="text" placeholder="name" onChange={(e)=>this.inputHandler(e)} value={this.state.username}></input>
                    <input name="email" style={{padding:'10px', margin:'10px'}} type="email" placeholder="email" onChange={(e)=>this.inputHandler(e)} value={this.state.email}></input>
                    <input name="address" style={{padding:'10px', margin:'10px'}} type="text" placeholder="address" onChange={(e)=>this.inputHandler(e)} value={this.state.address}></input> 
                    <div style={{display:'inline-block', padding:'10px',margin:'10px'}}>
                        {this.state.isLogin && (<button style={{padding:'10px', margin:'10px'}} onClick={()=>{this.log_out();}}>Logout</button>)}
                        {this.state.isLogin && (<button style={{padding:'10px', margin:'10px'}} onClick={()=>{this.update(this.state);}}>Update</button>)}
                        {this.state.isSign && (<button style={{padding:'10px', margin:'10px'}} onClick={()=>{this.sign_up(this.state);}}>Sign up</button>)}
                    </div>
                </div>
            </div>
        );
    }

    render(){
        if(this.state.isLogin || this.state.isSign){    
            return this.signPage();
        }
        return this.loginPage();
    }
}

ReactDOM.render(<Page/>,document.getElementById("login_form"));