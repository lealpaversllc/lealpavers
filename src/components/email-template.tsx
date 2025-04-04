import * as React from 'react'

import { Card, CardContent } from '@/components/ui/card-shad'

import type { FormSchema } from './contact'

export const EmailTemplate = ({
  name,
  email,
  phone,
  address,
  description,
}: FormSchema) => {
  return (
    <Card className="mx-auto w-full max-w-md space-y-4 p-6">
      <CardContent className="">
        <h2 className="text-xl font-semibold">New Contact Request</h2>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
        {address && (
          <p>
            <strong>Address:</strong> {address}
          </p>
        )}
        {description && (
          <p>
            <strong>Description:</strong> {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
