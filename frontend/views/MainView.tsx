import { Button } from "@vaadin/react-components/Button.js";
import { Notification } from "@vaadin/react-components/Notification.js";
import { TextField } from "@vaadin/react-components/TextField.js";
import { HelloEndpoint } from "Frontend/generated/endpoints.js";
import { useSignal } from "@preact/signals-react"; // change to "@vaadin/hilla-react-signals"; when available

export default function MainView() {
  const name = useSignal("");

  return (
    <>
      <TextField
        label="Your name"
        onValueChanged={(e) => {
          name.value = e.detail.value;
        }}
      />
      <Button
        onClick={async () => {
          const serverResponse = await HelloEndpoint.sayHello(name.value);
          Notification.show(serverResponse);
        }}
      >
        Say hello
      </Button>
    </>
  );
}
