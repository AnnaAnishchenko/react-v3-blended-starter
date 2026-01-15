import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers, ErrorMessage } from "formik";

import css from "./CreatePostForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/postService";

interface CreatePostFormProps {
  onClose: () => void;
}

interface FormValues {
  title: string;
  body: string;
}

const initialValues: FormValues = {
  title: "",
  body: "",
};  

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!") 
    .max(100, "Too Long!")
    .required("Required"),
  body: Yup.string()
    .min(1, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
}); 



export default function PostForm({onClose}: CreatePostFormProps) {
const queryClient = useQueryClient();
const mutation = useMutation({mutationFn: createPost, onSuccess: () => {
  queryClient.invalidateQueries({queryKey: ['posts']}); 
  alert('Post created successfully');
onClose();
}
})

const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
  mutation.mutate(values);
  actions.resetForm();
} 
 

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={PostSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows="8" className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onClose} className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
            Create post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
