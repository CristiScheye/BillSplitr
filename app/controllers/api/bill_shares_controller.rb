class Api::BillSharesController < Api::ApiController
  def index
    @bill_shares = BillShare.between_users(current_user.id, params[:user_id])
    render :index
  end

  def update
    @bill_share = BillShare.find(params[:id])
    if @bill_share.update_attributes(bill_share_params)
      render partial: 'api/bill_shares/bill_share', locals: { bill_share: @bill_share }
    else
      render json: {
        errors: @bill_share.errors.full_messages,
        status: :unprocessable_entity
      }
    end
  end

  private

  def bill_share_params
    params.require(:bill_share).permit(:id, :bill_id, :debtor_id, :amount, :status)
  end
end
