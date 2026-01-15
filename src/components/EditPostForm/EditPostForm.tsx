import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

import css from "./EditPostForm.module.css";
import { Post } from "../../types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, editPost } from "../../services/postService";

interface EditPostFormProps {   

  onClose: () => void;
  initialValue: Post
} 

interface FormValues {
  title: string;
  body: string;
  id: number;
}

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


export default function EditPostForm({onClose, initialValue}: EditPostFormProps ) {
const queryClient = useQueryClient();
const mutation = useMutation({mutationFn: editPost, onSuccess: () => {
  queryClient.invalidateQueries({queryKey: ['posts']}); 
  alert('Post edited successfully');
onClose();
}
})

const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
  mutation.mutate(values);
  actions.resetForm();
} 


  return (
    <Formik initialValues={initialValue} onSubmit={handleSubmit} validationSchema={ PostSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onClose} className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit"  className={css.submitButton} disabled={mutation.isPending}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
