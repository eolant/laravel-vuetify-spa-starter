<?php

namespace App\Notifications;

use Illuminate\Support\Facades\Lang;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\ResetPassword as Notification;

class ResetPassword extends Notification
{
    /**
     * Build the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject(Lang::getFromJson('Reset Password Notification'))
            ->line(Lang::getFromJson('You are receiving this email because we received a password reset request for your account.'))
            ->action(Lang::getFromJson('Reset Password'), url(config('app.url') . '/password/reset/' . $this->token) . '?email='.urlencode($notifiable->email))
            ->line(Lang::getFromJson('If you did not request a password reset, no further action is required.'));
    }
}
