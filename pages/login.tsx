import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  Typography,
  Button,
  Link,
} from '@material-ui/core';
import Layout from '../components/Layout';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React, { useState } from 'react';

interface ILogin {
  email: string;
  password: string;
}

const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

// export default class LoginForm extends React.Component {
//   constructor(props: any) {
//     super(props);
//     this.state = { email: '', password: '' };
//     this.handleEmailChange = this.handleEmailChange.bind(this);
//     this.handlePasswordChange = this.handlePasswordChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleEmailChange(event: any) {
//     console.log(event.target.value);
//     this.setState({ email: event.target.value });
//   }

//   handlePasswordChange(event: any) {
//     console.log(event.target.value);
//     this.setState({ password: event.target.value });
//   }

//   handleSubmit(event: any) {
//     console.log('email', this.state.email);
//     console.log('password', this.state.password);

//     let email = this.state.email;
//     let password = this.state.password;

//     useQuery(LOGIN, { variables: { email, password } });
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <Layout>
//         <Typography
//           variant="h4"
//           component="h1"
//           style={{ textAlign: 'center' }}
//           gutterBottom
//         >
//           Login
//         </Typography>
//         <Grid
//           container
//           alignContent="center"
//           justify="center"
//           direction="column"
//           spacing={2}
//         >
//           <Grid item xs={12}>
//             <Grid spacing={1} container direction="row">
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth>
//                   <InputLabel htmlFor="email">Email Address</InputLabel>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={this.state.email}
//                     onChange={this.handleEmailChange}
//                   ></Input>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth>
//                   <InputLabel htmlFor="password">Password</InputLabel>
//                   <Input
//                     id="password"
//                     type="password"
//                     value={this.state.password}
//                     onChange={this.handlePasswordChange}
//                   ></Input>
//                 </FormControl>
//               </Grid>
//               <Grid item md={4}>
//                 <Button
//                   style={{ alignSelf: 'flex-end' }}
//                   variant="contained"
//                   onClick={this.handleSubmit}
//                 >
//                   Login
//                 </Button>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item>
//             <Grid spacing={4} container>
//               <Grid item>
//                 <Link>Forgot Password?</Link>
//               </Grid>
//               <Grid item>
//                 <Link>Create Account</Link>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Layout>
//     );
//   }
// }

export default function Login() {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [login, { data }]: any = useLazyQuery(LOGIN);

  return (
    <Layout>
      <Typography
        variant="h4"
        component="h1"
        style={{ textAlign: 'center' }}
        gutterBottom
      >
        Login
      </Typography>
      <Grid
        container
        alignContent="center"
        justify="center"
        direction="column"
        spacing={2}
      >
        <Grid item xs={12}>
          <Grid spacing={1} container direction="row">
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  type="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                ></Input>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  value={formState.password}
                  onChange={(e) =>
                    setFormState({ ...formState, password: e.target.value })
                  }
                ></Input>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <Button
                style={{ alignSelf: 'flex-end' }}
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  login({
                    variables: {
                      email: formState.email,
                      password: formState.password,
                    },
                  });
                }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid spacing={4} container>
            <Grid item>
              <Link>Forgot Password?</Link>
            </Grid>
            <Grid item>
              <Link>Create Account</Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {data?.login}
    </Layout>
  );
}
