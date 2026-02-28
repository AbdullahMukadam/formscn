import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "formscn-ui";
import type { CardFeildProps } from "../../types";

export function CardFeild({
    title,
    description,
    children
}: CardFeildProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}
