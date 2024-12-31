import { ZodSchema } from "zod";

interface ZodError {
  success: boolean;
  data?: any;
  error?: any;
}

export const validater = async (
  schema: ZodSchema,
  input: object
): Promise<ZodError> => {
  const { success, error, data } = await schema.safeParseAsync(input);

  if (error) {
    const details = error.errors.map((error) => {
      return {
        field: error.path[0],
        issue: error.message,
      };
    });

    return { success, error: details };
  } else {
    return { success, data };
  }
};
