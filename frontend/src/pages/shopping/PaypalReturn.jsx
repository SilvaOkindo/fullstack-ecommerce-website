import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { capturePayment } from "@/store/shop/order-slice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"


const PaypalReturn = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const paymentId = params.get('paymentId')
    const payerId = params.get("token")

    useEffect(() => {
        if(paymentId && payerId) {
            const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"))
            dispatch(capturePayment({paymentId, payerId, orderId})).then((data) => {
                console.log(data, "data")
                if(data?.payload?.success) {
                    sessionStorage.removeItem("currentOrderId")
                    window.location.href = "/shop/payment-success"
                }
            }).catch((err) => {
                console.log(err, "error")
            });
        }
    })


  return (
    <Card>
        <CardHeader>
             <CardTitle>Processing payment...please wait</CardTitle>
        </CardHeader>
    </Card>
  )
}

export default PaypalReturn