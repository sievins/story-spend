import Error from "@/components/error";
import Form from "@/app/books/create/components/form";

export default function CreateBook() {
  return (
    <>
      <h1>Create book</h1>
      <Error>
        <FormWrapper />
      </Error>
    </>
  );
}

async function FormWrapper() {
  return <Form />;
}
