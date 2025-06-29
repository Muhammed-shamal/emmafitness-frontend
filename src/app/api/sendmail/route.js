import currency from 'currency.js';
import moment from 'moment';
import nodemailer from 'nodemailer'
import fetchApi from '../../../utility/api/fetchApi';

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendEmail({ to, subject, body }) {
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to, subject, html: body,
  };

  await transport.sendMail(mailOptions);
}


export async function POST(request) {

  const data = await request.json()
  try {





    // get customer detials 
    const user = await fetchApi({ URI: `auth/customer/me`, API_TOKEN: data?.token })

    if (data?.type == 'order-placed') orderPlaced({
      email: user?.email,
      client: user?.userName,
      contact: user?.Mobile,
      orderId: data?.orderId,
      items: data?.items,
      grandTotal: data?.grandTotal
    })
    return Response.json({ data: "Mail has been send" })
  } catch (err) {
    console.log(err)
    return Response.json(500, { data: "Could not send the mail" })

  }


}







async function orderPlaced({ email, orderId, items = [], grandTotal = 0 ,client, contact}) {

  const Price = new currency(grandTotal)
  // customer mail
  await sendEmail({
    to: email,
    subject: `Your Order has been placed! #${String(orderId).padStart(4, '0')}`,
    body: `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Order Confirmation</title>
      </head>
      <body>
          <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f4f4">
              <tr>
                  <td align="center">
                      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; font-family: Arial, sans-serif; padding: 20px;">
                          <tr>
                              <td>
                                  <h1>Your Order Confirmation</h1>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <p>Thank you for placing an order with us. Your order details are as follows:</p>
                                  <p><strong>Order ID:</strong> ${String(orderId).padStart(4, '0')}</p>
                                  <p><strong>Order Date:</strong> ${moment().format("DD-MM-YYYY")}</p>
                                  <p><strong>Order Total:</strong> ${Price.format({ symbol: "AED " })}</p>
                                
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <p><strong>Order Items:</strong></p>
                                  <ul>
                                  ${items?.map(it => `<li>${it?.name} -  ${it?.quantity}pcs</li>`)
      }
                                  </ul>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <p>To view the status of your order and access your order history, please visit our portal:</p>
                                  <p><a href="${process.env.NEXT_PUBLIC_URL}" style="text-decoration: none; color: #0078d4;">Visit Our Portal</a></p>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <p>If you have any questions or need further assistance, please contact our customer support team.</p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
  
      `,
  })

  // admin mail
  await sendEmail({
    to: process.env.EMAIL_ID,
    subject: `We have received an order! #${String(orderId).padStart(4, '0')}`,
    body: `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Order Detials</title>
      </head>
      <body>
          <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f4f4">
              <tr>
                  <td align="center">
                      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; font-family: Arial, sans-serif; padding: 20px;">
                          <tr>
                              <td>
                                  <h1>Order Detials</h1>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <p>Order details are as follows:</p>
                                  <p><strong>Order ID:</strong> ${String(orderId).padStart(4, '0')}</p>
                                  <p><strong>Order Date:</strong> ${moment().format("DD-MM-YYYY")}</p>
                                  <p><strong>Order Total:</strong> ${Price.format({ symbol: "AED " })}</p>
                                  <p><strong>Customer Name:</strong> ${client}</p>
                                  <p><strong>Contact:</strong> ${contact}</p>
                                  <p><strong>Email Id:</strong> ${email}</p>

                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <p><strong>Order Items:</strong></p>
                                  <ul>
                                  ${items?.map(it => `<li>${it?.name} - ${it?.quantity}pcs</li>`)
      }
                                  </ul>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <p>To view the status of your order and access your order history, please visit our portal:</p>
                                  <p><a href="${process.env.NEXT_PUBLIC_API_URL}" style="text-decoration: none; color: #0078d4;">Visit Our Portal</a></p>
                              </td>
                          </tr>
                       
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
  
      `,
  })

}