import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import CheckBox from '@material-ui/core/Checkbox';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import Layout from '../../../components/Layout';
import {
  useAddPostMutation,
  usePostByIdLazyQuery,
  useUpdatePostMutation,
} from '../../../generated/graphql';

interface Context extends NextPageContext {
  query: {
    id: string[] | undefined;
  };
}

interface IProps {
  id: number | undefined;
}

interface IFormInput {
  headline: string;
  published: boolean;
  content: string;
}

// interface IPost {
//   conent: string;
//   headline: string;
//   published: Date;
// }

const StaffBlogPage: NextPage<IProps> = ({ id }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormInput>();
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<string>('');
  const [postQuery, { loading: queryLoading, data }] = usePostByIdLazyQuery();
  const [updatePost, { loading: updateLoading }] = useUpdatePostMutation();
  const [addPost, { loading: addLoading }] = useAddPostMutation();

  const isLoading = () => queryLoading || updateLoading || addLoading;

  useEffect(() => {
    if (id) postQuery({ variables: { id } });
  }, [id]);

  useEffect(() => {
    if (data?.post) {
      reset({
        published: !!data.post.published,
        headline: data.post.headline,
      });

      setIsPublished(!!data.post.published);
    }
  }, [data]);

  const onSubmit = async (input: IFormInput) => {
    if (id) {
      await updatePost({
        variables: {
          post: {
            id,
            content: postContent,
            published: input.published ? new Date() : null,
            headline: input.headline,
          },
        },
      });
    } else {
      const result = await addPost({
        variables: {
          post: {
            content: postContent,
            published: input.published ? new Date() : null,
            headline: input.headline,
          },
        },
      });
      id = result.data?.addPost;
      router.push(`${result.data?.addPost}`, undefined, { shallow: true });
    }
  };

  return (
    <Layout>
      <Typography
        variant="h4"
        component="h1"
        style={{ textAlign: 'center' }}
        gutterBottom
      >
        EPSA Blog
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justify="center" style={{ marginBottom: '10px' }}>
          <Grid item md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="headline"
                    control={control}
                    rules={{ required: 'Headline is required' }}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        InputLabelProps={{ shrink: true }}
                        name="headline"
                        label="Headline"
                        placeholder="Insert headline here..."
                        inputProps={{ maxLength: 110 }}
                        error={!!errors.headline}
                        helperText={errors.headline?.message}
                      ></TextField>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <Controller
                    name="published"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormGroup>
                        <FormControlLabel
                          label="Published"
                          control={
                            <CheckBox
                              {...field}
                              checked={isPublished || false}
                              onChange={(input) => {
                                setIsPublished(input.target.checked);
                              }}
                            ></CheckBox>
                          }
                        ></FormControlLabel>
                      </FormGroup>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  style={{ alignSelf: 'flex-end', float: 'right' }}
                  disabled={isLoading()}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <SunEditor
          height="200px"
          setContents={data?.post.content}
          onChange={(e) => setPostContent(e)}
          setOptions={{
            buttonList: [
              ['undo', 'redo'],
              ['font', 'fontSize', 'formatBlock'],
              ['paragraphStyle', 'blockquote'],
              [
                'bold',
                'underline',
                'italic',
                'strike',
                'subscript',
                'superscript',
              ],
              ['fontColor', 'hiliteColor'],
              ['removeFormat'],
              ['outdent', 'indent'],
              ['align', 'horizontalRule', 'list', 'lineHeight'],
              ['table', 'link', 'image'],
              ['fullScreen', 'showBlocks', 'codeView'],
              ['preview'],
            ],
          }}
        ></SunEditor>
      </form>
    </Layout>
  );
};

StaffBlogPage.getInitialProps = (ctx: Context) => {
  if (ctx.query?.id) {
    return { id: parseInt(ctx.query.id[0]) };
  }
  return { id: undefined };
};

export default StaffBlogPage;
