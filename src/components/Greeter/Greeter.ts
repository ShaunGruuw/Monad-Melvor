export interface GreeterProps {
  name: string;
}

interface Greeter {
  props: GreeterProps;
}

export default function Greeter(props: GreeterProps): Component<Greeter> {
  return {
    $template: '#monad__greeter',
    props,
  };
}
