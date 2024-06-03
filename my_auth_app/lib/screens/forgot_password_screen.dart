import 'package:flutter/material.dart';
import 'package:my_auth_app/services/auth_service.dart';

class ForgotPasswordScreen extends StatefulWidget {
  @override
  _ForgotPasswordScreenState createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  final _formKey = GlobalKey<FormState>();
  String _email = '';

  void _requestPasswordReset() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      final response = await AuthService.requestPasswordReset(_email);
      if (response.containsKey('message') &&
          response['message'] == 'Password reset email sent successfully!') {
        // Handle successful password reset request
        print('Password reset email sent');
      } else {
        // Show error message
        print('Password reset request failed');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Forgot Password')),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                decoration: InputDecoration(labelText: 'Email'),
                keyboardType: TextInputType.emailAddress,
                onSaved: (value) => _email = value!,
                validator: (value) =>
                    value!.isEmpty ? 'Please enter your email' : null,
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _requestPasswordReset,
                child: Text('Reset Password'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
