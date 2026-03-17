import { TextField, type TextFieldProps } from '@mui/material';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<TextFieldProps, 'name' | 'defaultValue'>;

export function RHFTextField<T extends FieldValues>({ control, name, ...textFieldProps }: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...textFieldProps}
          {...field}
          value={field.value ?? ''}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message ?? textFieldProps.helperText}
        />
      )}
    />
  );
}

