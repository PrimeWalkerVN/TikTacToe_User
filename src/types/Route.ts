import { RouteChildrenProps, RouteComponentProps } from 'react-router-dom';

export interface RouteProps {
  location?: any;
  component: React.ComponentType;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
  children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
  path?: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
}
