class Api::PaymentsController < Api::ApiController
  def create
    @payment = Payment.new(payment_params)

    if @payment.save
      render partial: 'api/payments/payment'
    else
      render json: {
        errors: @payment.errors.full_messages,
        status: :unprocessable_entity
      }
    end
  end

  def index
    @payments = Payment.sent_or_received_by(current_user)
    render :index
  end
end