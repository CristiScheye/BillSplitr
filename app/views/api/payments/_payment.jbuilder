json.extract! payment, :id, :amount
json.date format_date(bill.date)

json.sender do
  json.id payment.sender.id
  json.f_name payment.sender.f_name
  json.l_name payment.sender.l_name
  json.email payment.sender.email
end

json.receiver do
  json.id payment.receiver.id
  json.f_name payment.receiver.f_name
  json.l_name payment.receiver.l_name
  json.email payment.receiver.email
end