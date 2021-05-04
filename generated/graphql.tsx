import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type EventInput = {
  id?: Maybe<Scalars['ID']>;
  parentId?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  description: Scalars['String'];
  allDay?: Maybe<Scalars['Boolean']>;
  start: Scalars['DateTime'];
  end?: Maybe<Scalars['DateTime']>;
  zipCode: Scalars['Float'];
  language: Scalars['String'];
};

export type EventQuery = IEvent & IEventInput & {
  __typename?: 'EventQuery';
  id: Scalars['ID'];
  parentId?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  description: Scalars['String'];
  allDay?: Maybe<Scalars['Boolean']>;
  start: Scalars['DateTime'];
  end?: Maybe<Scalars['DateTime']>;
  zipCode: Scalars['Float'];
  language: Scalars['String'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type GroupInput = {
  id: Scalars['ID'];
  facilitatorId: Scalars['Float'];
  city: Scalars['String'];
  zipCode: Scalars['Float'];
  language: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
  limit: Scalars['Int'];
};

export type GroupQuery = IGroup & IGroupInput & {
  __typename?: 'GroupQuery';
  id: Scalars['ID'];
  facilitatorId: Scalars['Float'];
  city: Scalars['String'];
  zipCode: Scalars['Float'];
  language: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
  limit: Scalars['Int'];
  facilitator?: Maybe<StaffQuery>;
  users?: Maybe<Array<UserQuery>>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type IEvent = {
  id: Scalars['ID'];
  parentId?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  description: Scalars['String'];
  allDay?: Maybe<Scalars['Boolean']>;
  start: Scalars['DateTime'];
  end?: Maybe<Scalars['DateTime']>;
  zipCode: Scalars['Float'];
  language: Scalars['String'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type IEventInput = {
  id: Scalars['ID'];
  parentId?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  description: Scalars['String'];
  allDay?: Maybe<Scalars['Boolean']>;
  start: Scalars['DateTime'];
  end?: Maybe<Scalars['DateTime']>;
  zipCode: Scalars['Float'];
  language: Scalars['String'];
};

export type IGroup = {
  id: Scalars['ID'];
  facilitatorId: Scalars['Float'];
  city: Scalars['String'];
  zipCode: Scalars['Float'];
  language: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
  limit: Scalars['Int'];
  facilitator?: Maybe<StaffQuery>;
  users?: Maybe<Array<UserQuery>>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type IGroupInput = {
  id: Scalars['ID'];
  facilitatorId: Scalars['Float'];
  city: Scalars['String'];
  zipCode: Scalars['Float'];
  language: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
  limit: Scalars['Int'];
};

export type IPost = {
  id: Scalars['ID'];
  authorId?: Maybe<Scalars['Float']>;
  published?: Maybe<Scalars['DateTime']>;
  headline: Scalars['String'];
  imgUrl?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  author?: Maybe<StaffQuery>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type IPostInput = {
  id: Scalars['ID'];
  authorId?: Maybe<Scalars['Float']>;
  published?: Maybe<Scalars['DateTime']>;
  headline: Scalars['String'];
  imgUrl?: Maybe<Scalars['String']>;
  content: Scalars['String'];
};

export type IRole = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type IStaff = {
  id: Scalars['ID'];
  userId: Scalars['Float'];
  start?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  user: UserQuery;
  img?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type IStaffInput = {
  id: Scalars['ID'];
  userId: Scalars['Float'];
  start?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  user: IUserInput;
};

export type IUser = {
  id: Scalars['ID'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  roles: Array<RoleQuery>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type IUserInput = {
  id: Scalars['ID'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  resetPassword: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  addUser: Scalars['String'];
  updateUser: Scalars['String'];
  login: Scalars['String'];
  addEvent: EventQuery;
  updateEvent: EventQuery;
  addStaff: Scalars['Float'];
  updateStaff: Scalars['Boolean'];
  removeStaff: Scalars['Boolean'];
  uploadAvatar: Scalars['Boolean'];
  addPost: Scalars['Float'];
  updatePost: Scalars['Boolean'];
  removePost: Scalars['Boolean'];
  createGroup: GroupQuery;
  updateGroup: Scalars['Boolean'];
  deleteGroup: Scalars['Boolean'];
};


export type MutationResetPasswordArgs = {
  input: UserResetPassword;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationAddUserArgs = {
  newUser: NewUserInput;
};


export type MutationUpdateUserArgs = {
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


export type MutationAddStaffArgs = {
  staff: StaffInput;
};


export type MutationUpdateStaffArgs = {
  staff: StaffUpdate;
};


export type MutationRemoveStaffArgs = {
  id: Scalars['Float'];
};


export type MutationUploadAvatarArgs = {
  userId: Scalars['Float'];
  file: Scalars['Upload'];
};


export type MutationAddPostArgs = {
  post: PostInput;
};


export type MutationUpdatePostArgs = {
  post: PostInput;
};


export type MutationRemovePostArgs = {
  id: Scalars['Float'];
};


export type MutationCreateGroupArgs = {
  group: GroupInput;
};


export type MutationUpdateGroupArgs = {
  group: GroupInput;
  id: Scalars['Float'];
};


export type MutationDeleteGroupArgs = {
  id: Scalars['Float'];
};

export type NewUserInput = {
  id?: Maybe<Scalars['ID']>;
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type PostInput = {
  id?: Maybe<Scalars['ID']>;
  authorId?: Maybe<Scalars['Float']>;
  published?: Maybe<Scalars['DateTime']>;
  headline: Scalars['String'];
  imgUrl?: Maybe<Scalars['String']>;
  content: Scalars['String'];
};

export type PostQuery = IPost & IPostInput & {
  __typename?: 'PostQuery';
  id: Scalars['ID'];
  authorId?: Maybe<Scalars['Float']>;
  published?: Maybe<Scalars['DateTime']>;
  headline: Scalars['String'];
  imgUrl?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  author?: Maybe<StaffQuery>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  users: Array<UserQuery>;
  user: UserQuery;
  events: Array<EventQuery>;
  event: EventQuery;
  allStaff: Array<StaffQuery>;
  staff: StaffQuery;
  allPosts: Array<PostQuery>;
  post: PostQuery;
  groups: Array<GroupQuery>;
  group: GroupQuery;
};


export type QueryUsersArgs = {
  inRoles?: Maybe<Array<Scalars['String']>>;
  notInRoles?: Maybe<Array<Scalars['String']>>;
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};


export type QueryEventsArgs = {
  take?: Maybe<Scalars['Int']>;
};


export type QueryEventArgs = {
  id: Scalars['Float'];
};


export type QueryStaffArgs = {
  id: Scalars['Float'];
};


export type QueryAllPostsArgs = {
  take?: Maybe<Scalars['Int']>;
  isPublished?: Maybe<Scalars['Boolean']>;
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};


export type QueryGroupsArgs = {
  take?: Maybe<Scalars['Int']>;
  zipCode?: Maybe<Scalars['Int']>;
  language?: Maybe<Scalars['String']>;
};


export type QueryGroupArgs = {
  withUsers: Scalars['Boolean'];
  id: Scalars['Float'];
};

export type RoleQuery = IRole & {
  __typename?: 'RoleQuery';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type StaffInput = {
  id?: Maybe<Scalars['ID']>;
  userId: Scalars['Float'];
  start?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  user: UserInput;
};

export type StaffQuery = IStaff & IStaffInput & {
  __typename?: 'StaffQuery';
  id: Scalars['ID'];
  userId: Scalars['Float'];
  start?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  user: UserQuery;
  img?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type StaffUpdate = {
  start?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  userId: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  user: UserInput;
};


export type UserInput = {
  id?: Maybe<Scalars['ID']>;
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
};

export type UserQuery = IUser & IUserInput & {
  __typename?: 'UserQuery';
  id: Scalars['ID'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  roles: Array<RoleQuery>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type UserResetPassword = {
  nonce: Scalars['String'];
  password: Scalars['String'];
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

export type AddPostMutationVariables = Exact<{
  post: PostInput;
}>;


export type AddPostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addPost'>
);

export type UpdatePostMutationVariables = Exact<{
  post: PostInput;
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updatePost'>
);

export type RemovePostMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type RemovePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removePost'>
);

export type UpdateStaffMutationVariables = Exact<{
  staff: StaffUpdate;
}>;


export type UpdateStaffMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateStaff'>
);

export type UploadAvatarMutationVariables = Exact<{
  file: Scalars['Upload'];
  userId: Scalars['Float'];
}>;


export type UploadAvatarMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadAvatar'>
);

export type AddStaffMutationVariables = Exact<{
  staff: StaffInput;
}>;


export type AddStaffMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addStaff'>
);

export type RemoveStaffMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type RemoveStaffMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeStaff'>
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
  newUser: NewUserInput;
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

export type EventsQueryVariables = Exact<{
  take?: Maybe<Scalars['Int']>;
}>;


export type EventsQuery = (
  { __typename?: 'Query' }
  & { events: Array<(
    { __typename?: 'EventQuery' }
    & Pick<EventQuery, 'id' | 'parentId' | 'name' | 'description' | 'start' | 'end' | 'allDay' | 'zipCode' | 'language'>
  )> }
);

export type EventByIdQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type EventByIdQuery = (
  { __typename?: 'Query' }
  & { event: (
    { __typename?: 'EventQuery' }
    & Pick<EventQuery, 'id' | 'parentId' | 'name' | 'description' | 'start' | 'end' | 'allDay' | 'zipCode' | 'language'>
  ) }
);

export type AllGroupsQueryVariables = Exact<{
  take?: Maybe<Scalars['Int']>;
  zipCode?: Maybe<Scalars['Int']>;
  language?: Maybe<Scalars['String']>;
}>;


export type AllGroupsQuery = (
  { __typename?: 'Query' }
  & { groups: Array<(
    { __typename?: 'GroupQuery' }
    & Pick<GroupQuery, 'id' | 'facilitatorId' | 'zipCode' | 'language' | 'city' | 'created_at'>
    & { facilitator?: Maybe<(
      { __typename?: 'StaffQuery' }
      & Pick<StaffQuery, 'id' | 'img'>
      & { user: (
        { __typename?: 'UserQuery' }
        & Pick<UserQuery, 'id' | 'email' | 'first_name' | 'last_name'>
      ) }
    )> }
  )> }
);

export type GroupByIdQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GroupByIdQuery = (
  { __typename?: 'Query' }
  & { group: (
    { __typename?: 'GroupQuery' }
    & Pick<GroupQuery, 'id' | 'facilitatorId' | 'zipCode' | 'language' | 'city' | 'created_at'>
    & { facilitator?: Maybe<(
      { __typename?: 'StaffQuery' }
      & Pick<StaffQuery, 'id' | 'img'>
      & { user: (
        { __typename?: 'UserQuery' }
        & Pick<UserQuery, 'id' | 'email' | 'first_name' | 'last_name'>
      ) }
    )> }
  ) }
);

export type GroupByIdWithUsersQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GroupByIdWithUsersQuery = (
  { __typename?: 'Query' }
  & { group: (
    { __typename?: 'GroupQuery' }
    & Pick<GroupQuery, 'id' | 'facilitatorId' | 'zipCode' | 'language' | 'city' | 'created_at'>
    & { facilitator?: Maybe<(
      { __typename?: 'StaffQuery' }
      & Pick<StaffQuery, 'id' | 'img'>
      & { user: (
        { __typename?: 'UserQuery' }
        & Pick<UserQuery, 'id' | 'email' | 'first_name' | 'last_name'>
      ) }
    )>, users?: Maybe<Array<(
      { __typename?: 'UserQuery' }
      & Pick<UserQuery, 'id' | 'email' | 'first_name' | 'last_name'>
    )>> }
  ) }
);

export type AllPostsQueryVariables = Exact<{
  isPublished?: Maybe<Scalars['Boolean']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type AllPostsQuery = (
  { __typename?: 'Query' }
  & { allPosts: Array<(
    { __typename?: 'PostQuery' }
    & Pick<PostQuery, 'id' | 'authorId' | 'headline' | 'published' | 'created_at' | 'updated_at'>
    & { author?: Maybe<(
      { __typename?: 'StaffQuery' }
      & Pick<StaffQuery, 'img'>
      & { user: (
        { __typename?: 'UserQuery' }
        & Pick<UserQuery, 'email' | 'first_name' | 'last_name'>
      ) }
    )> }
  )> }
);

export type AllPostIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPostIdsQuery = (
  { __typename?: 'Query' }
  & { allPosts: Array<(
    { __typename?: 'PostQuery' }
    & Pick<PostQuery, 'id'>
  )> }
);

export type PostByIdQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type PostByIdQuery = (
  { __typename?: 'Query' }
  & { post: (
    { __typename?: 'PostQuery' }
    & Pick<PostQuery, 'id' | 'authorId' | 'headline' | 'content' | 'published' | 'created_at' | 'updated_at'>
    & { author?: Maybe<(
      { __typename?: 'StaffQuery' }
      & Pick<StaffQuery, 'img'>
      & { user: (
        { __typename?: 'UserQuery' }
        & Pick<UserQuery, 'email' | 'first_name' | 'last_name'>
      ) }
    )> }
  ) }
);

export type AllStaffQueryVariables = Exact<{ [key: string]: never; }>;


export type AllStaffQuery = (
  { __typename?: 'Query' }
  & { allStaff: Array<(
    { __typename?: 'StaffQuery' }
    & Pick<StaffQuery, 'id' | 'start' | 'description' | 'img'>
    & { user: (
      { __typename?: 'UserQuery' }
      & Pick<UserQuery, 'id' | 'first_name' | 'last_name' | 'email'>
    ) }
  )> }
);

export type StaffByIdQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type StaffByIdQuery = (
  { __typename?: 'Query' }
  & { staff: (
    { __typename?: 'StaffQuery' }
    & Pick<StaffQuery, 'id' | 'userId' | 'start' | 'description' | 'img'>
    & { user: (
      { __typename?: 'UserQuery' }
      & Pick<UserQuery, 'id' | 'first_name' | 'last_name' | 'email'>
    ) }
  ) }
);

export type UserListQueryVariables = Exact<{
  inRoles?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  notInRoles?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type UserListQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'UserQuery' }
    & Pick<UserQuery, 'id' | 'first_name' | 'last_name' | 'email'>
    & { roles: Array<(
      { __typename?: 'RoleQuery' }
      & Pick<RoleQuery, 'id' | 'name'>
    )> }
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEventMutation, AddEventMutationVariables>(AddEventDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, options);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const AddPostDocument = gql`
    mutation AddPost($post: PostInput!) {
  addPost(post: $post)
}
    `;
export type AddPostMutationFn = Apollo.MutationFunction<AddPostMutation, AddPostMutationVariables>;

/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostMutation, { data, loading, error }] = useAddPostMutation({
 *   variables: {
 *      post: // value for 'post'
 *   },
 * });
 */
export function useAddPostMutation(baseOptions?: Apollo.MutationHookOptions<AddPostMutation, AddPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, options);
      }
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = Apollo.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = Apollo.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($post: PostInput!) {
  updatePost(post: $post)
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      post: // value for 'post'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const RemovePostDocument = gql`
    mutation RemovePost($id: Float!) {
  removePost(id: $id)
}
    `;
export type RemovePostMutationFn = Apollo.MutationFunction<RemovePostMutation, RemovePostMutationVariables>;

/**
 * __useRemovePostMutation__
 *
 * To run a mutation, you first call `useRemovePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePostMutation, { data, loading, error }] = useRemovePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemovePostMutation(baseOptions?: Apollo.MutationHookOptions<RemovePostMutation, RemovePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePostMutation, RemovePostMutationVariables>(RemovePostDocument, options);
      }
export type RemovePostMutationHookResult = ReturnType<typeof useRemovePostMutation>;
export type RemovePostMutationResult = Apollo.MutationResult<RemovePostMutation>;
export type RemovePostMutationOptions = Apollo.BaseMutationOptions<RemovePostMutation, RemovePostMutationVariables>;
export const UpdateStaffDocument = gql`
    mutation UpdateStaff($staff: StaffUpdate!) {
  updateStaff(staff: $staff)
}
    `;
export type UpdateStaffMutationFn = Apollo.MutationFunction<UpdateStaffMutation, UpdateStaffMutationVariables>;

/**
 * __useUpdateStaffMutation__
 *
 * To run a mutation, you first call `useUpdateStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStaffMutation, { data, loading, error }] = useUpdateStaffMutation({
 *   variables: {
 *      staff: // value for 'staff'
 *   },
 * });
 */
export function useUpdateStaffMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStaffMutation, UpdateStaffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStaffMutation, UpdateStaffMutationVariables>(UpdateStaffDocument, options);
      }
export type UpdateStaffMutationHookResult = ReturnType<typeof useUpdateStaffMutation>;
export type UpdateStaffMutationResult = Apollo.MutationResult<UpdateStaffMutation>;
export type UpdateStaffMutationOptions = Apollo.BaseMutationOptions<UpdateStaffMutation, UpdateStaffMutationVariables>;
export const UploadAvatarDocument = gql`
    mutation UploadAvatar($file: Upload!, $userId: Float!) {
  uploadAvatar(file: $file, userId: $userId)
}
    `;
export type UploadAvatarMutationFn = Apollo.MutationFunction<UploadAvatarMutation, UploadAvatarMutationVariables>;

/**
 * __useUploadAvatarMutation__
 *
 * To run a mutation, you first call `useUploadAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadAvatarMutation, { data, loading, error }] = useUploadAvatarMutation({
 *   variables: {
 *      file: // value for 'file'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUploadAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UploadAvatarMutation, UploadAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadAvatarMutation, UploadAvatarMutationVariables>(UploadAvatarDocument, options);
      }
export type UploadAvatarMutationHookResult = ReturnType<typeof useUploadAvatarMutation>;
export type UploadAvatarMutationResult = Apollo.MutationResult<UploadAvatarMutation>;
export type UploadAvatarMutationOptions = Apollo.BaseMutationOptions<UploadAvatarMutation, UploadAvatarMutationVariables>;
export const AddStaffDocument = gql`
    mutation AddStaff($staff: StaffInput!) {
  addStaff(staff: $staff)
}
    `;
export type AddStaffMutationFn = Apollo.MutationFunction<AddStaffMutation, AddStaffMutationVariables>;

/**
 * __useAddStaffMutation__
 *
 * To run a mutation, you first call `useAddStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStaffMutation, { data, loading, error }] = useAddStaffMutation({
 *   variables: {
 *      staff: // value for 'staff'
 *   },
 * });
 */
export function useAddStaffMutation(baseOptions?: Apollo.MutationHookOptions<AddStaffMutation, AddStaffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddStaffMutation, AddStaffMutationVariables>(AddStaffDocument, options);
      }
export type AddStaffMutationHookResult = ReturnType<typeof useAddStaffMutation>;
export type AddStaffMutationResult = Apollo.MutationResult<AddStaffMutation>;
export type AddStaffMutationOptions = Apollo.BaseMutationOptions<AddStaffMutation, AddStaffMutationVariables>;
export const RemoveStaffDocument = gql`
    mutation RemoveStaff($id: Float!) {
  removeStaff(id: $id)
}
    `;
export type RemoveStaffMutationFn = Apollo.MutationFunction<RemoveStaffMutation, RemoveStaffMutationVariables>;

/**
 * __useRemoveStaffMutation__
 *
 * To run a mutation, you first call `useRemoveStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeStaffMutation, { data, loading, error }] = useRemoveStaffMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveStaffMutation(baseOptions?: Apollo.MutationHookOptions<RemoveStaffMutation, RemoveStaffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveStaffMutation, RemoveStaffMutationVariables>(RemoveStaffDocument, options);
      }
export type RemoveStaffMutationHookResult = ReturnType<typeof useRemoveStaffMutation>;
export type RemoveStaffMutationResult = Apollo.MutationResult<RemoveStaffMutation>;
export type RemoveStaffMutationOptions = Apollo.BaseMutationOptions<RemoveStaffMutation, RemoveStaffMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const AddUserDocument = gql`
    mutation AddUser($newUser: NewUserInput!) {
  addUser(newUser: $newUser)
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
 *      newUser: // value for 'newUser'
 *   },
 * });
 */
export function useAddUserMutation(baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const EventsDocument = gql`
    query Events($take: Int) {
  events(take: $take) {
    id
    parentId
    name
    description
    start
    end
    allDay
    zipCode
    language
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
 *      take: // value for 'take'
 *   },
 * });
 */
export function useEventsQuery(baseOptions?: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
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
    zipCode
    language
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventByIdQuery, EventByIdQueryVariables>(EventByIdDocument, options);
      }
export function useEventByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventByIdQuery, EventByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventByIdQuery, EventByIdQueryVariables>(EventByIdDocument, options);
        }
export type EventByIdQueryHookResult = ReturnType<typeof useEventByIdQuery>;
export type EventByIdLazyQueryHookResult = ReturnType<typeof useEventByIdLazyQuery>;
export type EventByIdQueryResult = Apollo.QueryResult<EventByIdQuery, EventByIdQueryVariables>;
export const AllGroupsDocument = gql`
    query AllGroups($take: Int, $zipCode: Int, $language: String) {
  groups(take: $take, zipCode: $zipCode, language: $language) {
    id
    facilitatorId
    zipCode
    language
    city
    created_at
    facilitator {
      id
      img
      user {
        id
        email
        first_name
        last_name
      }
    }
  }
}
    `;

/**
 * __useAllGroupsQuery__
 *
 * To run a query within a React component, call `useAllGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllGroupsQuery({
 *   variables: {
 *      take: // value for 'take'
 *      zipCode: // value for 'zipCode'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useAllGroupsQuery(baseOptions?: Apollo.QueryHookOptions<AllGroupsQuery, AllGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllGroupsQuery, AllGroupsQueryVariables>(AllGroupsDocument, options);
      }
export function useAllGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllGroupsQuery, AllGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllGroupsQuery, AllGroupsQueryVariables>(AllGroupsDocument, options);
        }
export type AllGroupsQueryHookResult = ReturnType<typeof useAllGroupsQuery>;
export type AllGroupsLazyQueryHookResult = ReturnType<typeof useAllGroupsLazyQuery>;
export type AllGroupsQueryResult = Apollo.QueryResult<AllGroupsQuery, AllGroupsQueryVariables>;
export const GroupByIdDocument = gql`
    query GroupById($id: Float!) {
  group(id: $id, withUsers: false) {
    id
    facilitatorId
    zipCode
    language
    city
    created_at
    facilitator {
      id
      img
      user {
        id
        email
        first_name
        last_name
      }
    }
  }
}
    `;

/**
 * __useGroupByIdQuery__
 *
 * To run a query within a React component, call `useGroupByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGroupByIdQuery(baseOptions: Apollo.QueryHookOptions<GroupByIdQuery, GroupByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupByIdQuery, GroupByIdQueryVariables>(GroupByIdDocument, options);
      }
export function useGroupByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupByIdQuery, GroupByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupByIdQuery, GroupByIdQueryVariables>(GroupByIdDocument, options);
        }
export type GroupByIdQueryHookResult = ReturnType<typeof useGroupByIdQuery>;
export type GroupByIdLazyQueryHookResult = ReturnType<typeof useGroupByIdLazyQuery>;
export type GroupByIdQueryResult = Apollo.QueryResult<GroupByIdQuery, GroupByIdQueryVariables>;
export const GroupByIdWithUsersDocument = gql`
    query GroupByIdWithUsers($id: Float!) {
  group(id: $id, withUsers: true) {
    id
    facilitatorId
    zipCode
    language
    city
    created_at
    facilitator {
      id
      img
      user {
        id
        email
        first_name
        last_name
      }
    }
    users {
      id
      email
      first_name
      last_name
    }
  }
}
    `;

/**
 * __useGroupByIdWithUsersQuery__
 *
 * To run a query within a React component, call `useGroupByIdWithUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupByIdWithUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupByIdWithUsersQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGroupByIdWithUsersQuery(baseOptions: Apollo.QueryHookOptions<GroupByIdWithUsersQuery, GroupByIdWithUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupByIdWithUsersQuery, GroupByIdWithUsersQueryVariables>(GroupByIdWithUsersDocument, options);
      }
export function useGroupByIdWithUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupByIdWithUsersQuery, GroupByIdWithUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupByIdWithUsersQuery, GroupByIdWithUsersQueryVariables>(GroupByIdWithUsersDocument, options);
        }
export type GroupByIdWithUsersQueryHookResult = ReturnType<typeof useGroupByIdWithUsersQuery>;
export type GroupByIdWithUsersLazyQueryHookResult = ReturnType<typeof useGroupByIdWithUsersLazyQuery>;
export type GroupByIdWithUsersQueryResult = Apollo.QueryResult<GroupByIdWithUsersQuery, GroupByIdWithUsersQueryVariables>;
export const AllPostsDocument = gql`
    query AllPosts($isPublished: Boolean, $take: Int) {
  allPosts(isPublished: $isPublished, take: $take) {
    id
    authorId
    author {
      user {
        email
        first_name
        last_name
      }
      img
    }
    headline
    published
    created_at
    updated_at
  }
}
    `;

/**
 * __useAllPostsQuery__
 *
 * To run a query within a React component, call `useAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPostsQuery({
 *   variables: {
 *      isPublished: // value for 'isPublished'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
      }
export function useAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
        }
export type AllPostsQueryHookResult = ReturnType<typeof useAllPostsQuery>;
export type AllPostsLazyQueryHookResult = ReturnType<typeof useAllPostsLazyQuery>;
export type AllPostsQueryResult = Apollo.QueryResult<AllPostsQuery, AllPostsQueryVariables>;
export const AllPostIdsDocument = gql`
    query AllPostIds {
  allPosts(isPublished: true) {
    id
  }
}
    `;

/**
 * __useAllPostIdsQuery__
 *
 * To run a query within a React component, call `useAllPostIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPostIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPostIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPostIdsQuery(baseOptions?: Apollo.QueryHookOptions<AllPostIdsQuery, AllPostIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPostIdsQuery, AllPostIdsQueryVariables>(AllPostIdsDocument, options);
      }
export function useAllPostIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPostIdsQuery, AllPostIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPostIdsQuery, AllPostIdsQueryVariables>(AllPostIdsDocument, options);
        }
export type AllPostIdsQueryHookResult = ReturnType<typeof useAllPostIdsQuery>;
export type AllPostIdsLazyQueryHookResult = ReturnType<typeof useAllPostIdsLazyQuery>;
export type AllPostIdsQueryResult = Apollo.QueryResult<AllPostIdsQuery, AllPostIdsQueryVariables>;
export const PostByIdDocument = gql`
    query PostById($id: Float!) {
  post(id: $id) {
    id
    authorId
    author {
      user {
        email
        first_name
        last_name
      }
      img
    }
    headline
    content
    published
    created_at
    updated_at
  }
}
    `;

/**
 * __usePostByIdQuery__
 *
 * To run a query within a React component, call `usePostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostByIdQuery(baseOptions: Apollo.QueryHookOptions<PostByIdQuery, PostByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostByIdQuery, PostByIdQueryVariables>(PostByIdDocument, options);
      }
export function usePostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostByIdQuery, PostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostByIdQuery, PostByIdQueryVariables>(PostByIdDocument, options);
        }
export type PostByIdQueryHookResult = ReturnType<typeof usePostByIdQuery>;
export type PostByIdLazyQueryHookResult = ReturnType<typeof usePostByIdLazyQuery>;
export type PostByIdQueryResult = Apollo.QueryResult<PostByIdQuery, PostByIdQueryVariables>;
export const AllStaffDocument = gql`
    query AllStaff {
  allStaff {
    id
    start
    description
    img
    user {
      id
      first_name
      last_name
      email
    }
  }
}
    `;

/**
 * __useAllStaffQuery__
 *
 * To run a query within a React component, call `useAllStaffQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllStaffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllStaffQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllStaffQuery(baseOptions?: Apollo.QueryHookOptions<AllStaffQuery, AllStaffQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllStaffQuery, AllStaffQueryVariables>(AllStaffDocument, options);
      }
export function useAllStaffLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllStaffQuery, AllStaffQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllStaffQuery, AllStaffQueryVariables>(AllStaffDocument, options);
        }
export type AllStaffQueryHookResult = ReturnType<typeof useAllStaffQuery>;
export type AllStaffLazyQueryHookResult = ReturnType<typeof useAllStaffLazyQuery>;
export type AllStaffQueryResult = Apollo.QueryResult<AllStaffQuery, AllStaffQueryVariables>;
export const StaffByIdDocument = gql`
    query StaffById($id: Float!) {
  staff(id: $id) {
    id
    userId
    start
    description
    img
    user {
      id
      first_name
      last_name
      email
    }
  }
}
    `;

/**
 * __useStaffByIdQuery__
 *
 * To run a query within a React component, call `useStaffByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useStaffByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStaffByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStaffByIdQuery(baseOptions: Apollo.QueryHookOptions<StaffByIdQuery, StaffByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StaffByIdQuery, StaffByIdQueryVariables>(StaffByIdDocument, options);
      }
export function useStaffByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StaffByIdQuery, StaffByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StaffByIdQuery, StaffByIdQueryVariables>(StaffByIdDocument, options);
        }
export type StaffByIdQueryHookResult = ReturnType<typeof useStaffByIdQuery>;
export type StaffByIdLazyQueryHookResult = ReturnType<typeof useStaffByIdLazyQuery>;
export type StaffByIdQueryResult = Apollo.QueryResult<StaffByIdQuery, StaffByIdQueryVariables>;
export const UserListDocument = gql`
    query UserList($inRoles: [String!] = [], $notInRoles: [String!] = []) {
  users(inRoles: $inRoles, notInRoles: $notInRoles) {
    id
    first_name
    last_name
    email
    roles {
      id
      name
    }
  }
}
    `;

/**
 * __useUserListQuery__
 *
 * To run a query within a React component, call `useUserListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserListQuery({
 *   variables: {
 *      inRoles: // value for 'inRoles'
 *      notInRoles: // value for 'notInRoles'
 *   },
 * });
 */
export function useUserListQuery(baseOptions?: Apollo.QueryHookOptions<UserListQuery, UserListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
      }
export function useUserListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserListQuery, UserListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
        }
export type UserListQueryHookResult = ReturnType<typeof useUserListQuery>;
export type UserListLazyQueryHookResult = ReturnType<typeof useUserListLazyQuery>;
export type UserListQueryResult = Apollo.QueryResult<UserListQuery, UserListQueryVariables>;
export const UserByIdDocument = gql`
    query UserById($id: Float!) {
  user(id: $id) {
    id
    first_name
    last_name
    email
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
      }
export function useUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
        }
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdQueryResult = Apollo.QueryResult<UserByIdQuery, UserByIdQueryVariables>;