'use client';

import { UseFormReturn } from 'react-hook-form';
import styles from './PromptForm.module.scss';
import {
  Form, FormControl, FormField, FormItem,
} from './shadcn/form';
import { Input } from './shadcn/input';
import { Button } from './shadcn/button';

type TextPrompt = {
  type?: 'prompt' | 'image';
  name: string;
  id: string;
  placeholder?: string;
};

interface PromptFormProps {
  form: UseFormReturn<any, any, undefined>;
  submit: (values: any) => Promise<void>;
  fields: TextPrompt[];
}

const PromptForm = ({
  form,
  submit,
  fields,
}: PromptFormProps) => {
  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className={styles.promptForm}
      >
        {fields.map((field) => (
          <FormField
            name={field.name}
            render={({ field: inputProps }) => (
              <FormItem className={styles.formItem} id={field.id}>
                <FormControl className={styles.formControl}>
                  <Input
                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                    disabled={isSubmitting}
                    placeholder={field.placeholder}
                    {...inputProps}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
        <Button
          className={styles.submitButton}
          disabled={isSubmitting}
          type="submit"
        >
          Generate
        </Button>
      </form>
    </Form>
  );
};

export default PromptForm;
