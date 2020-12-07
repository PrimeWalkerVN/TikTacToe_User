import { RouteChildrenProps, RouteComponentProps, RouteProps } from 'react-router-dom';

export interface PrivateRouteProps extends RouteProps {
  location?: any;
  component: any;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
  children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
  path?: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
}
