import 'package:flutter/material.dart';
import 'package:your_app/services/auth_service.dart';

class ResetPasswordScreen extends StatefulWidget {
  @override
  _ResetPasswordScreenState createState() => _ResetPasswordScreenState();
}

class _ResetPasswordScreenState extends State<ResetPasswordScreen> {
  final _formKey = GlobalKey<FormState>();
  String _token = '';
  String _newPassword = '';

  void _resetPassword() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      final response = await AuthService.resetPassword(_token, _newPassword);
      if (response.containsKey('message')) {
        // Handle password reset success
        print('Password reset successful');
      } else {
        // Show error message
        print('Password reset failed');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Reset Password')),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                decoration: InputDecoration(labelText: 'Token'),
                onSaved: (value) => _token = value!,
                validator: (value) =>
                    value!.isEmpty ? 'Please enter the reset token' : null,
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'New Password'),
                obscureText: true,
                onSaved: (value) => _newPassword = value!,
                validator: (value) =>
                    value!.isEmpty ? 'Please enter your new password' : null,
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _resetPassword,
                child: Text('Reset Password'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
