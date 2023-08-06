'use client';

import { UseFormReturn } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import styles from './PromptForm.module.scss';
import {
  Form, FormControl, FormField, FormItem,
} from './shadcn/form';
import { Input } from './shadcn/input';
import { Button } from './shadcn/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from './shadcn/select';

type SelectOption = {
  value: string;
  label: string;
};

interface Field extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  selectOptions?: SelectOption[];
}

interface PromptFormProps {
  form: UseFormReturn<any, any, undefined>;
  submit: (values: any) => Promise<void>;
  promptField: Field;
  selectFields?: Field[];
  buttonColor?: string;
}

const PromptForm = ({
  form,
  submit,
  promptField,
  selectFields,
  buttonColor,
}: PromptFormProps) => {
  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className={styles.promptForm}
      >
        <FormField
          key={promptField.name}
          name={promptField.name}
          render={({ field: inputProps }) => (
            <FormItem
              className={cn(styles.textField, {
                [styles.singleLine]: selectFields && selectFields.length > 0,
              })}
              id={promptField.id}
            >
              <FormControl className={styles.formControl}>
                <Input
                  className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                  disabled={isSubmitting}
                  placeholder={promptField.placeholder}
                  {...inputProps}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {selectFields?.map((field) => (
          <FormField
            key={field.name}
            name={field.name}
            control={form.control}
            render={({ field: inputProps }) => (
              <FormItem className={styles.selectField}>
                <Select
                  disabled={isSubmitting}
                  onValueChange={inputProps.onChange}
                  value={inputProps.value}
                  defaultValue={inputProps.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.selectOptions!.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        ))}

        <Button
          className={cn(styles.submitButton, buttonColor)}
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
