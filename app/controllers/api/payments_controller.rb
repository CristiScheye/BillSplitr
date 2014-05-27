class Api::PaymentsController < Api::ApiController
  def create
    @payment = Payment.new(payment_params)

    if @payment.save
      render partial: 'api/payments/payment', locals: { payment: @payment }
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

  private
  def payment_params
    clean_params = params.require(:payment).permit(
      :receiver_id,
      :sender_id,
      :amount,
      :date)
    clean_params[:date] ||= Time.now().strftime('%m/%d/%Y')
    clean_params[:date] = Date.strptime(clean_params[:date], '%m/%d/%Y')
    clean_params
  end
end
