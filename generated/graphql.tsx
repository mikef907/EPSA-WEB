import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  users: Array<UserQuery>;
  user: UserQuery;
  events: Array<EventQuery>;
  event: EventQuery;
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};


export type QueryEventArgs = {
  id: Scalars['Float'];
};

export type UserQuery = {
  __typename?: 'UserQuery';
  id: Scalars['ID'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  roles: Array<RoleQuery>;
  staff?: Maybe<StaffQuery>;
};

export type RoleQuery = {
  __typename?: 'RoleQuery';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type StaffQuery = {
  __typename?: 'StaffQuery';
  id: Scalars['ID'];
  userId: Scalars['Float'];
  start: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  img?: Maybe<Scalars['String']>;
};


export type EventQuery = {
  __typename?: 'EventQuery';
  id: Scalars['ID'];
  parentId?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  description: Scalars['String'];
  allDay?: Maybe<Scalars['Boolean']>;
  start: Scalars['DateTime'];
  end?: Maybe<Scalars['DateTime']>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  resetPassword: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  addUser: Scalars['String'];
  login: Scalars['String'];
  addEvent: EventQuery;
  updateEvent: EventQuery;
};


export type MutationResetPasswordArgs = {
  input: UserResetPassword;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationAddUserArgs = {
  data: UserInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationAddEventArgs = {
  event: EventInput;
};


export type MutationUpdateEventArgs = {
  event: EventInput;
};

export type UserResetPassword = {
  nonce: Scalars['String'];
  password: Scalars['String'];
};

export type UserInput = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type EventInput = {
  id?: Maybe<Scalars['Float']>;
  parentId?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  description: Scalars['String'];
  allDay?: Maybe<Scalars['Boolean']>;
  start: Scalars['DateTime'];
  end?: Maybe<Scalars['DateTime']>;
};

export type AddEventMutationVariables = Exact<{
  event: EventInput;
}>;


export type AddEventMutation = (
  { __typename?: 'Mutation' }
  & { addEvent: (
    { __typename?: 'EventQuery' }
    & Pick<EventQuery, 'id' | 'parentId' | 'name' | 'description' | 'allDay' | 'start' | 'end'>
  ) }
);

export type UpdateEventMutationVariables = Exact<{
  event: EventInput;
}>;


export type UpdateEventMutation = (
  { __typename?: 'Mutation' }
  & { updateEvent: (
    { __typename?: 'EventQuery' }
    & Pick<EventQuery, 'id' | 'parentId' | 'name' | 'description' | 'allDay' | 'start' | 'end'>
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  input: UserResetPassword;
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resetPassword'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type AddUserMutationVariables = Exact<{
  data: UserInput;
}>;


export type AddUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addUser'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = (
  { __typename?: 'Query' }
  & { events: Array<(
    { __typename?: 'EventQuery' }
    & Pick<EventQuery, 'id' | 'parentId' | 'name' | 'description' | 'start' | 'end' | 'allDay'>
  )> }
);

export type EventByIdQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type EventByIdQuery = (
  { __typename?: 'Query' }
  & { event: (
    { __typename?: 'EventQuery' }
    & Pick<EventQuery, 'id' | 'parentId' | 'name' | 'description' | 'start' | 'end' | 'allDay'>
  ) }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'UserQuery' }
    & Pick<UserQuery, 'id' | 'first_name' | 'last_name' | 'email'>
  )> }
);

export type UserByIdQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type UserByIdQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'UserQuery' }
    & Pick<UserQuery, 'id' | 'first_name' | 'last_name' | 'email'>
    & { staff?: Maybe<(
      { __typename?: 'StaffQuery' }
      & Pick<StaffQuery, 'userId' | 'start' | 'description' | 'img'>
    )> }
  ) }
);


export const AddEventDocument = gql`
    mutation AddEvent($event: EventInput!) {
  addEvent(event: $event) {
    id
    parentId
    name
    description
    allDay
    start
    end
  }
}
    `;
export type AddEventMutationFn = Apollo.MutationFunction<AddEventMutation, AddEventMutationVariables>;

/**
 * __useAddEventMutation__
 *
 * To run a mutation, you first call `useAddEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEventMutation, { data, loading, error }] = useAddEventMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useAddEventMutation(baseOptions?: Apollo.MutationHookOptions<AddEventMutation, AddEventMutationVariables>) {
        return Apollo.useMutation<AddEventMutation, AddEventMutationVariables>(AddEventDocument, baseOptions);
      }
export type AddEventMutationHookResult = ReturnType<typeof useAddEventMutation>;
export type AddEventMutationResult = Apollo.MutationResult<AddEventMutation>;
export type AddEventMutationOptions = Apollo.BaseMutationOptions<AddEventMutation, AddEventMutationVariables>;
export const UpdateEventDocument = gql`
    mutation UpdateEvent($event: EventInput!) {
  updateEvent(event: $event) {
    id
    parentId
    name
    description
    allDay
    start
    end
  }
}
    `;
export type UpdateEventMutationFn = Apollo.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useUpdateEventMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>) {
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, baseOptions);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($input: UserResetPassword!) {
  resetPassword(input: $input)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const AddUserDocument = gql`
    mutation AddUser($data: UserInput!) {
  addUser(data: $data)
}
    `;
export type AddUserMutationFn = Apollo.MutationFunction<AddUserMutation, AddUserMutationVariables>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddUserMutation(baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
        return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, baseOptions);
      }
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const EventsDocument = gql`
    query Events {
  events {
    id
    parentId
    name
    description
    start
    end
    allDay
  }
}
    `;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventsQuery(baseOptions?: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, baseOptions);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, baseOptions);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
export const EventByIdDocument = gql`
    query EventById($id: Float!) {
  event(id: $id) {
    id
    parentId
    name
    description
    start
    end
    allDay
  }
}
    `;

/**
 * __useEventByIdQuery__
 *
 * To run a query within a React component, call `useEventByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventByIdQuery(baseOptions: Apollo.QueryHookOptions<EventByIdQuery, EventByIdQueryVariables>) {
        return Apollo.useQuery<EventByIdQuery, EventByIdQueryVariables>(EventByIdDocument, baseOptions);
      }
export function useEventByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventByIdQuery, EventByIdQueryVariables>) {
          return Apollo.useLazyQuery<EventByIdQuery, EventByIdQueryVariables>(EventByIdDocument, baseOptions);
        }
export type EventByIdQueryHookResult = ReturnType<typeof useEventByIdQuery>;
export type EventByIdLazyQueryHookResult = ReturnType<typeof useEventByIdLazyQuery>;
export type EventByIdQueryResult = Apollo.QueryResult<EventByIdQuery, EventByIdQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    first_name
    last_name
    email
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UserByIdDocument = gql`
    query UserById($id: Float!) {
  user(id: $id) {
    id
    first_name
    last_name
    email
    staff {
      userId
      start
      description
      img
    }
  }
}
    `;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByIdQuery(baseOptions: Apollo.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
        return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, baseOptions);
      }
export function useUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
          return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, baseOptions);
        }
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdQueryResult = Apollo.QueryResult<UserByIdQuery, UserByIdQueryVariables>;